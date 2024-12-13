import { defineProps } from "vue";
import { ref } from "vue";

export const useModalStore = defineProps("modal", () => {
  const showModal = ref(false);

  function openModal() {
    showModal.value = true;
  }

  function closeModal() {
    showModal.value = false;
  }

  return {
    showModal,
    openModal,
    closeModal,
  };
});
