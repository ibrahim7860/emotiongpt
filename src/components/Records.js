
		let chunks = [];
		let stream = null;
		let recorder = null;
		const recordButton = document.getElementById('record');
		const stopButton = document.getElementById('stop');
		const audioFileInput = document.getElementById('audio-file');
		const uploadForm = document.getElementById('upload-form');

		recordButton.addEventListener('click', async () => {
			try {
				stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				recorder = new MediaRecorder(stream);

				recorder.addEventListener('dataavailable', event => {
					chunks.push(event.data);
				});

				recorder.start();
				recordButton.disabled = true;
				stopButton.disabled = false;
			} catch (error) {
				console.error('Failed to record audio: ', error);
			}
		});

		stopButton.addEventListener('click', async () => {
			recorder.stop();
			stream.getTracks().forEach(track => track.stop());
			recordButton.disabled = false;
			stopButton.disabled = true;

			const audioBlob = new Blob(chunks, { type: 'audio/webm' });
			const formData = new FormData();
			formData.append('audio-file', audioBlob, 'audio.webm');

			try {
				const response = await fetch('/upload-audio', {
					method: 'POST',
					body: formData,
				});
				console.log('Audio uploaded successfully!');
			} catch (error) {
				console.error('Failed to upload audio: ', error);
			}

			chunks = [];
			stream = null;
			recorder = null;
		});

		uploadForm.addEventListener('submit', event => {
			event.preventDefault();
			audioFileInput.click();
		});

		audioFileInput.addEventListener('change', () => {
			uploadForm.submit();
		});

