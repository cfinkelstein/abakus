/**
 * Shared audio context and utility functions for sound effects
 * Prevents memory leaks by reusing a single AudioContext instance
 */

let audioContext: AudioContext | null = null;

/**
 * Gets or creates the shared AudioContext instance
 */
export function getAudioContext(): AudioContext {
	if (!audioContext) {
		audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
	}
	return audioContext;
}

/**
 * Plays a click sound effect
 */
export function playClickSound(): void {
	const ctx = getAudioContext();
	const oscillator = ctx.createOscillator();
	const gainNode = ctx.createGain();

	oscillator.connect(gainNode);
	gainNode.connect(ctx.destination);

	oscillator.frequency.value = 800;
	oscillator.type = 'sine';

	gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
	gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

	oscillator.start(ctx.currentTime);
	oscillator.stop(ctx.currentTime + 0.1);
}

/**
 * Plays a success sound (cheerful ascending chord: C5, E5, G5)
 */
export function playSuccessSound(): void {
	const ctx = getAudioContext();
	const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

	frequencies.forEach((freq, index) => {
		const oscillator = ctx.createOscillator();
		const gainNode = ctx.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(ctx.destination);

		oscillator.frequency.value = freq;
		oscillator.type = 'sine';

		const startTime = ctx.currentTime + (index * 0.1);
		gainNode.gain.setValueAtTime(0.2, startTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

		oscillator.start(startTime);
		oscillator.stop(startTime + 0.3);
	});
}
