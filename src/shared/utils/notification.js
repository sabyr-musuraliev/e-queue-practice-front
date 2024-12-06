export function playNotificationSound() {
  const audio = new Audio("/audio/notification-sound.mp3");
  audio.play();
}
