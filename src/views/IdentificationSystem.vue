<template>
  <div class="min-h-screen bg-gray flex flex-col items-center justify-center p-4 font-sans">

    <div class="w-full max-w-2xl bg-white  p-6 md:p-8">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">{{ $t('appTitle') }}</h1>

      <!-- Step 0: Document selection -->
      <div v-if="step === 0" class="text-center">
        <p class="text-gray-700 mb-6">{{ $t('selectDocumentType') }}</p>
        <div class="flex flex-col space-y-4">
          <button @click="handleDocumentSelect(DOCUMENT_TYPES.PASSPORT)"
            class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            {{ $t('passport') }}
          </button>
          <button @click="handleDocumentSelect(DOCUMENT_TYPES.NATIONAL_ID)"
            class="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            {{ $t('cni') }}
          </button>
          <button @click="handleDocumentSelect(DOCUMENT_TYPES.DRIVING_LICENSE)"
            class="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            {{ $t('drivingLicense') }}
          </button>
        </div>
      </div>

      <!-- Step 1 or 2: Document capture (front or back) -->
      <div v-if="step === 1 || step === 2" class="text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ getDocumentCaptureText() }}</h2>
        <p class="text-gray-700 mb-6">
          {{ getDocumentGuidanceText() }}
        </p>

        <div v-if="cameraError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
          role="alert">
          <p class="font-bold">{{ $t('error') }}</p>
          <p>{{ cameraError }}</p>
        </div>

        <template
          v-if="!getCurrentDocumentImage() || (documentType === DOCUMENT_TYPES.NATIONAL_ID && (!capturedNationalIdFrontImage || !capturedNationalIdBackImage))">
          <!-- Show camera video if image not yet captured or both sides of ID not captured -->
          <div class="relative w-full bg-gray-200 rounded-lg overflow-hidden mb-6 aspect-video">
            <video ref="videoRef" class="w-full h-full object-cover rounded-lg" autoplay playsinline></video>
            <!-- Overlay to guide user -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="border-4 border-dashed border-white rounded-lg w-3/4 h-3/4 opacity-75"></div>
            </div>
          </div>
          <button @click="captureDocumentPhoto"
            class="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            :disabled="!stream">
            {{ getCaptureButtonText() }}
          </button>
        </template>
        <template v-else>
          <!-- Show captured image and action buttons -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ getCapturedImageTitle() }}</h3>
            <img :src="getCurrentDocumentImage() as string" :alt="$t('capturedDocumentAlt')"
              class="w-full h-auto rounded-lg shadow-md mb-6 object-contain max-h-96 mx-auto" />
            <div class="flex flex-col md:flex-row gap-4">
              <button @click="reprendreDocumentPhoto"
                class="flex-1 px-6 py-3 bg-red text-white font-semibold rounded-lg shadow-md hover:bg-red/95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                {{ $t('retake') }}
              </button>
              <button @click="goToNextDocumentStep"
                class="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                {{ documentType === DOCUMENT_TYPES.NATIONAL_ID && !capturedNationalIdBackImage ? $t('continueTakeVerso')
                  : $t('continueTakeSelfie') }}
              </button>
            </div>
          </div>
        </template>
        <canvas ref="canvasRef" class="hidden"></canvas>
      </div>

      <!-- Step 3: Selfie capture -->
      <div v-if="step === 3" class="text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ $t('captureSelfie') }}</h2>
        <p class="text-gray-700 mb-6">
          {{ $t('selfieGuidance') }}
        </p>

        <div v-if="cameraError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
          role="alert">
          <p class="font-bold">{{ $t('error') }}</p>
          <p>{{ cameraError }}</p>
        </div>

        <template v-if="!capturedSelfieImage">
          <div class="relative w-full bg-gray-200 rounded-lg overflow-hidden mb-6 aspect-video">
            <video ref="selfieVideoRef" class="w-full h-full object-cover rounded-lg" autoplay playsinline></video>
            <!-- Overlay for face guidance -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="border-4 border-dashed border-white rounded-full w-1/2 h-3/4 opacity-75"></div>
            </div>
          </div>
          <button @click="captureSelfiePhoto"
            class="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            :disabled="!selfieStream">
            {{ $t('takeSelfie') }}
          </button>
        </template>
        <template v-else>
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ $t('capturedSelfie') }}</h3>
            <img :src="capturedSelfieImage" :alt="$t('capturedSelfieAlt')"
              class="w-full h-auto rounded-lg shadow-md mb-6 object-contain max-h-96 mx-auto" />
            <div class="flex flex-col md:flex-row gap-4">
              <button @click="reprendreSelfiePhoto"
                class="flex-1 px-6 py-3 bg-red text-white font-semibold rounded-lg shadow-md hover:bg-red/95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                {{ $t('retake') }}
              </button>
              <button @click="finishProcess"
                class="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                {{ $t('finishIdentification') }}
              </button>
            </div>
          </div>
        </template>
        <canvas ref="selfieCanvasRef" class="hidden"></canvas>
      </div>

      <!-- Step 4: Summary (simulated) -->
      <div v-if="step === 4" class="text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ $t('summaryTitle') }}</h2>
        <p class="text-gray-700 mb-6">
          {{ $t('summaryMessage') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <template v-if="documentType === DOCUMENT_TYPES.NATIONAL_ID">
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('cniRecto') }}</h3>
              <img v-if="capturedNationalIdFrontImage" :src="capturedNationalIdFrontImage" :alt="$t('cniRectoAlt')"
                class="w-full h-auto rounded-lg shadow-md object-contain max-h-64 mx-auto" />
              <p v-else class="text-gray-500">{{ $t('noCniRecto') }}</p>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('cniVerso') }}</h3>
              <img v-if="capturedNationalIdBackImage" :src="capturedNationalIdBackImage" :alt="$t('cniVersoAlt')"
                class="w-full h-auto rounded-lg shadow-md object-contain max-h-64 mx-auto" />
              <p v-else class="text-gray-500">{{ $t('noCniVerso') }}</p>
            </div>
          </template>
          <template v-else>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('documentTypeLabel', {
                type: $t(documentType)
                }) }}</h3>
              <img v-if="getCurrentDocumentImage()" :src="getCurrentDocumentImage() as string" :alt="$t('capturedDocumentAlt')"
                class="w-full h-auto rounded-lg shadow-md object-contain max-h-64 mx-auto" />
              <p v-else class="text-gray-500">{{ $t('noDocumentCaptured') }}</p>
            </div>
          </template>
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $t('selfie') }}</h3>
            <img v-if="capturedSelfieImage" :src="capturedSelfieImage" :alt="$t('capturedSelfieAlt')"
              class="w-full h-auto rounded-lg shadow-md mb-6 object-contain max-h-64 mx-auto" />
            <p v-else class="text-gray-500">{{ $t('noSelfieCaptured') }}</p>
          </div>
        </div>
        <div class="flex flex-row gap-4">

          <button @click="resetApplication"
            class="w-full px-6 py-3 bg-red text-white font-semibold rounded-lg shadow-md hover:bg-gray/25 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            {{ $t('restart') }}
          </button>

          <button @click="uploadIdentification"
            class="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray/25 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            <Spinner v-if="isLoading" class="mr-2" />
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>

    <ConfirmationModal v-if="showConfirmationModal" @close="showConfirmationModal = false; resetApplication()"
      :$t="$t" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '../router';
import { uploadBase64Image } from '../components/Utilities/UtilitiesFunction';
import { editDocumentGlobal } from '../lib/appwrite';
import { patronCollection } from '../components/Utilities/constants';
import Spinner from '../components/Utilities/Spinner.vue';

// Document types enum (English)
const DOCUMENT_TYPES = {
  PASSPORT: 'passport',
  NATIONAL_ID: 'national_id',
  DRIVING_LICENSE: 'driving_license'
} as const;

const { t } = useI18n();
const documentId = router.currentRoute.value.params.documentId;
const patron = ref();

const showConfirmationModal = ref(false);
const ConfirmationModal = {
  props: {
    $t: {
      type: Function,
      required: true
    }
  },
  emits: ['close'],
  template: `
    <div class="fixed inset-0 bg-gray bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('identificationCompleteTitle') }}</h3>
        <p class="text-gray-700 mb-6">
          {{ $t('identificationCompleteMessage') }}
        </p>
        <button
          @click="$emit('close')"
          class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          {{ $t('closeAndRestart') }}
        </button>
      </div>
    </div>
  `
};

// Refs for DOM elements
const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const selfieVideoRef = ref<HTMLVideoElement | null>(null);
const selfieCanvasRef = ref<HTMLCanvasElement | null>(null);
const isLoading = ref(false);
// State
const stream = ref<MediaStream | null>(null);
const selfieStream = ref<MediaStream | null>(null);
const documentType = ref<string>('');
const capturedPassportImage = ref<string | null>(null);
const capturedDrivingLicenseImage = ref<string | null>(null);
const capturedNationalIdFrontImage = ref<string | null>(null);
const capturedNationalIdBackImage = ref<string | null>(null);
const capturedSelfieImage = ref<string | null>(null);
const step = ref<number>(0);
const cameraError = ref<string>('');

// Camera functions
const startCamera = async (isSelfie = false) => {
  cameraError.value = '';
  try {
    const constraints = {
      video: {
        facingMode: isSelfie ? 'user' : 'environment'
      }
    };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    const targetVideoRef = isSelfie ? selfieVideoRef : videoRef;
    const setTargetStream = isSelfie ? (val: MediaStream) => { selfieStream.value = val; } : (val: MediaStream) => { stream.value = val; };

    if (targetVideoRef.value) {
      if (targetVideoRef.value.srcObject) {
        (targetVideoRef.value.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      targetVideoRef.value.srcObject = mediaStream;
      try {
        await targetVideoRef.value.play();
      } catch (playErr: any) {
        if (playErr.name !== "AbortError") {
          cameraError.value = t('cameraStartError');
        }
      }
    }
    setTargetStream(mediaStream);
  } catch (err) {
    cameraError.value = t('cameraAccessError');
  }
};

const stopCamera = (currentStream: typeof stream, videoElementRef: typeof videoRef) => {
  if (currentStream && currentStream.value) {
    currentStream.value.getTracks().forEach(track => track.stop());
  }
  if (videoElementRef && videoElementRef.value) {
    videoElementRef.value.srcObject = null;
  }
};

// Watch step to manage camera
watch(step, (newStep) => {
  if (newStep === 1) {
    startCamera(false);
  } else if (newStep === 2) {
    stopCamera(stream, videoRef);
    startCamera(false);
  } else if (newStep === 3) {
    stopCamera(stream, videoRef);
    stopCamera(selfieStream, selfieVideoRef);
    startCamera(true);
  } else if (newStep === 0 || newStep === 4) {
    stopCamera(stream, videoRef);
    stopCamera(selfieStream, selfieVideoRef);
  }
});

onUnmounted(() => {
  stopCamera(stream, videoRef);
  stopCamera(selfieStream, selfieVideoRef);
});

// Document selection
function handleDocumentSelect(type: string) {
  documentType.value = type;
  step.value = 1;
}

// Capture document photo
function captureDocumentPhoto() {
  if (videoRef.value && canvasRef.value) {
    const video = videoRef.value;
    const canvas = canvasRef.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
      if (!capturedNationalIdFrontImage.value) {
        capturedNationalIdFrontImage.value = imageData;
      } else {
        capturedNationalIdBackImage.value = imageData;
      }
    } else if (documentType.value === DOCUMENT_TYPES.PASSPORT) {
      capturedPassportImage.value = imageData;
    } else if (documentType.value === DOCUMENT_TYPES.DRIVING_LICENSE) {
      capturedDrivingLicenseImage.value = imageData;
    }
    stopCamera(stream, videoRef);
  }
}

// Capture selfie photo
function captureSelfiePhoto() {
  if (selfieVideoRef.value && selfieCanvasRef.value) {
    const video = selfieVideoRef.value;
    const canvas = selfieCanvasRef.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedSelfieImage.value = canvas.toDataURL('image/png');
    stopCamera(selfieStream, selfieVideoRef);
  }
}

// Next step after document capture
function goToNextDocumentStep() {
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID && !capturedNationalIdBackImage.value) {
    step.value = 2;
  } else {
    step.value = 3;
  }
}

// Reset
function resetApplication() {
  documentType.value = '';
  capturedPassportImage.value = null;
  capturedDrivingLicenseImage.value = null;
  capturedNationalIdFrontImage.value = null;
  capturedNationalIdBackImage.value = null;
  capturedSelfieImage.value = null;
  step.value = 0;
  cameraError.value = '';
  showConfirmationModal.value = false;
}

// Retake document photo
function reprendreDocumentPhoto() {
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
    if (capturedNationalIdBackImage.value) {
      capturedNationalIdBackImage.value = null;
      startCamera(false);
    } else if (capturedNationalIdFrontImage.value) {
      capturedNationalIdFrontImage.value = null;
      startCamera(false);
    }
  } else {
    if (documentType.value === DOCUMENT_TYPES.PASSPORT) capturedPassportImage.value = null;
    if (documentType.value === DOCUMENT_TYPES.DRIVING_LICENSE) capturedDrivingLicenseImage.value = null;
    startCamera(false);
  }
}

// Retake selfie
function reprendreSelfiePhoto() {
  capturedSelfieImage.value = null;
  startCamera(true);
}

// Get current document image
function getCurrentDocumentImage() {
  if (documentType.value === DOCUMENT_TYPES.PASSPORT) return capturedPassportImage.value;
  if (documentType.value === DOCUMENT_TYPES.DRIVING_LICENSE) return capturedDrivingLicenseImage.value;
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
    return capturedNationalIdBackImage.value || capturedNationalIdFrontImage.value;
  }
  return ;
}

// Utility translation functions
function getDocumentCaptureText() {
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
    if (!capturedNationalIdFrontImage.value) {
      return t('captureCniRecto');
    } else if (!capturedNationalIdBackImage.value) {
      return t('captureCniVerso');
    }
  }
  return t('captureDocument', { type: t(documentType.value) });
}

function getDocumentGuidanceText() {
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
    if (!capturedNationalIdFrontImage.value) {
      return t('guidanceCniRecto');
    } else if (!capturedNationalIdBackImage.value) {
      return t('guidanceCniVerso');
    }
  }
  return t('guidanceDocument', { type: t(documentType.value) });
}

function getCaptureButtonText() {
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
    if (!capturedNationalIdFrontImage.value) {
      return t('takeRectoPhoto');
    } else if (!capturedNationalIdBackImage.value) {
      return t('takeVersoPhoto');
    }
  }
  return t('takePhoto');
}

function getCapturedImageTitle() {
  if (documentType.value === DOCUMENT_TYPES.NATIONAL_ID) {
    if (capturedNationalIdBackImage.value) {
      return t('capturedCniVerso');
    } else if (capturedNationalIdFrontImage.value) {
      return t('capturedCniRecto');
    }
  }
  return t('capturedDocument', { type: t(documentType.value) });
}

const finishProcess = () => {
  step.value = 4;
  showConfirmationModal.value = true;
}

// Main upload function for identification
const uploadIdentification = async (): Promise<void> => {
  try {
    isLoading.value = true;

    type IdentificationUrls = {
      capturedPassportImageUrl?: string;
      capturedDrivingLicenseImageUrl?: string;
      capturedNationalIdFrontImageUrl?: string;
      capturedNationalIdBackImageUrl?: string;
      capturedSelfieImageUrl?: string;
    };

    type Identification = {
      documentType: string;
      date: string;
      identifyBy: string;
    } & IdentificationUrls;

    // 1. Upload each image and get URLs
    const urls: IdentificationUrls = {};

    if (capturedPassportImage.value) {
      urls.capturedPassportImageUrl = await uploadBase64Image(
        capturedPassportImage.value,
        `passport_${Date.now()}.png`,
        'identification/passport'
      );
    }
    if (capturedDrivingLicenseImage.value) {
      urls.capturedDrivingLicenseImageUrl = await uploadBase64Image(
        capturedDrivingLicenseImage.value,
        `driving_license_${Date.now()}.png`,
        'identification/driving_license'
      );
    }
    if (capturedNationalIdFrontImage.value) {
      urls.capturedNationalIdFrontImageUrl = await uploadBase64Image(
        capturedNationalIdFrontImage.value,
        `national_id_front_${Date.now()}.png`,
        'identification/national_id'
      );
    }
    if (capturedNationalIdBackImage.value) {
      urls.capturedNationalIdBackImageUrl = await uploadBase64Image(
        capturedNationalIdBackImage.value,
        `national_id_back_${Date.now()}.png`,
        'identification/national_id'
      );
    }
    if (capturedSelfieImage.value) {
      urls.capturedSelfieImageUrl = await uploadBase64Image(
        capturedSelfieImage.value,
        `selfie_${Date.now()}.png`,
        'identification/selfie'
      );
    }

    // 2. Prepare the identification object with URLs
    const identification: Identification = {
      documentType: documentType.value,
      ...urls,
      date: new Date().toISOString(),
      identifyBy:( documentId ? documentId : 'unknown_user') as string,
    };
    await editDocumentGlobal(patronCollection, documentId as string, JSON.stringify({ identification }));

  } catch (err: any) {
    alert('Upload failed: ' + (err?.message ?? err));
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
/* Styles spécifiques si nécessaire, mais Tailwind gère la plupart des choses */
</style>