import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KokoroTTS } from 'kokoro-js';

type KokoroVoice =
  | 'af_heart' | 'af_alloy' | 'af_aoede' | 'af_bella' | 'af_jessica' | 'af_kore' | 'af_nicole'
  | 'af_nova' | 'af_river' | 'af_sarah' | 'af_sky'
  | 'am_adam' | 'am_echo' | 'am_eric' | 'am_jordan' | 'am_luna' | 'am_morgan' | 'am_oliver'
  | 'am_sage' | 'am_skyler' | 'am_taylor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  text = 'Hello, world!';
  tts: KokoroTTS | null = null;
  loading = true;
  speaking = false;
  voices: KokoroVoice[] = [];
  selectedVoice: KokoroVoice = 'af_heart';

  ngOnInit(): void {
    this.initModel();
  }

  async initModel(): Promise<void> {
    const model_id = 'onnx-community/Kokoro-82M-v1.0-ONNX';
    const supportsWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

    try {
      this.tts = await KokoroTTS.from_pretrained(model_id, {
        dtype: supportsWebGPU ? 'fp32' : 'q8',
        device: supportsWebGPU ? 'webgpu' : 'wasm'
      });

      const rawVoices = this.tts.list_voices();
      console.log("Available voices:", rawVoices);

      this.voices = Array.isArray(rawVoices)
        ? (rawVoices as KokoroVoice[])
        : [
            'af_heart', 'af_alloy', 'af_aoede', 'af_bella', 'af_jessica', 'af_kore', 'af_nicole',
            'af_nova', 'af_river', 'af_sarah', 'af_sky',
            'am_adam', 'am_echo', 'am_eric', 'am_jordan', 'am_luna', 'am_morgan', 'am_oliver',
            'am_sage', 'am_skyler', 'am_taylor'
          ];

      if (!this.voices.includes(this.selectedVoice)) {
        this.selectedVoice = this.voices[0];
      }
    } catch (error) {
      console.error('Failed to initialize KokoroTTS:', error);
      this.voices = [];
    }

    this.loading = false;
  }

  async play(): Promise<void> {
  if (!this.tts || !this.text.trim()) return;

  this.speaking = true;

  // Let Angular update the UI before blocking
  setTimeout(async () => {
    try {
      const audio = await this.tts!.generate(this.text, {
        voice: this.selectedVoice as any
      });

      const blob = new Blob([audio.toWav()], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const player = new Audio(url);
      player.play();

      player.onended = () => {
        this.speaking = false;
      };
    } catch (error) {
      console.error('Error generating audio:', error);
      this.speaking = false;
    }
  }, 0);
}

}
