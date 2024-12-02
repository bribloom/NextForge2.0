// utils/screenRecordingDetection.ts

export const isScreenRecording = () => {
    // Check for specific browser features that might indicate screen recording
    // This is a basic example and may not cover all cases

    // Check for media devices
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        return navigator.mediaDevices.enumerateDevices().then(devices => {
            // Check for screen capture devices
            const hasScreenCapture = devices.some(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('screen'));
            return hasScreenCapture;
        });
    }
    return Promise.resolve(false);
};