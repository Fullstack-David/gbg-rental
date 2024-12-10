import { ref } from "vue";

const bookedItems = ref([]);

export function useBookings() {
  const addBooking = (bookingsDetails) => {
    bookedItems.value.push(bookingsDetails);
  };

  return {
    bookedItems,
    addBooking,
  };
}
