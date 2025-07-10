<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        aria-label="Close"
      >&times;</button>
      <h2 class="text-2xl font-bold mb-4">{{ t('captureContractTitle') }}</h2>
      <div v-if="!capturedImage" class="mb-4">
        <video ref="videoRef" class="rounded shadow" autoplay playsinline width="400" height="300"></video>
        <div class="flex gap-4 mt-4">
          <button @click="capturePhoto" class="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            {{ t('takePhoto') }}
          </button>
          <button @click="stopCamera" class="px-4 py-2 bg-red text-white rounded shadow hover:bg-red/95">
            {{ t('stopCamera') }}
          </button>
        </div>
      </div>
      <div v-else class="flex flex-col items-center">
        <img :src="capturedImage" :alt="t('capturedContractAlt')" class="rounded shadow mb-4 max-w-xs" />
        <div class="flex gap-4">
          <button @click="uploadImage" :disabled="isUploading" class="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700">
            <span v-if="isUploading">{{ t('uploading') }}</span>
            <span v-else>{{ t('upload') }}</span>
          </button>
          <button @click="retakePhoto" class="px-4 py-2 bg-red text-white rounded shadow hover:bg-red">
            {{ t('retake') }}
          </button>
        </div>
        <div v-if="uploadedUrl" class="mt-4 text-green-700">
          {{ t('uploaded') }} <a :href="uploadedUrl" target="_blank" class="underline">{{ t('viewImage') }}</a>
        </div>
      </div>
      <canvas ref="canvasRef" class="hidden"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
// filepath: src/views/ContractCapture.vue
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { uploadBase64Image } from '@/components/Utilities/UtilitiesFunction';

const props = defineProps<{
  modelValue: boolean
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'uploaded', url: string): void
  (e: 'close'): void
}>();

const { t } = useI18n();

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const stream = ref<MediaStream | null>(null);
const capturedImage = ref<string | null>(null);
const uploadedUrl = ref<string | null>(null);
const isUploading = ref(false);

const startCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value;
      await videoRef.value.play();
    }
  } catch (err) {
    alert(t('cameraAccessError'));
  }
};

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }
};

const capturePhoto = () => {
  if (videoRef.value && canvasRef.value) {
    const video = videoRef.value;
    const canvas = canvasRef.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedImage.value = canvas.toDataURL('image/png');
    stopCamera();
  }
};

const retakePhoto = () => {
  capturedImage.value = null;
  uploadedUrl.value = null;
  startCamera();
};

const uploadImage = async () => {
  if (!capturedImage.value) return;
  isUploading.value = true;
  try {
    const url = await uploadBase64Image(
      capturedImage.value,
      `contract_${Date.now()}.png`,
      'identification/contract'
    );
    uploadedUrl.value = url;
    emit('uploaded', url);
  } catch (err: any) {
    alert(t('uploadFailed') + ': ' + (err?.message ?? err));
  } finally {
    isUploading.value = false;
  }
};

const closeModal = () => {
  stopCamera();
  emit('update:modelValue', false);
  emit('close');
};

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      capturedImage.value = null;
      uploadedUrl.value = null;
      startCamera();
    } else {
      stopCamera();
    }
  }
);

onUnmounted(() => {
  stopCamera();
});
</script>