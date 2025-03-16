// @/lib/services/mockAcr122uService.js

/**
 * Service untuk mensimulasikan perangkat ACS ACR122U dalam mode development
 */
class MockAcr122uService {
    constructor() {
      this.isConnected = false;
      this.isPolling = false;
      this.deviceInfo = {
        deviceName: "ACS ACR122U USB Reader (Simulated)",
        serialNumber: "ACR122U-SIM-001",
        firmwareVersion: "1.0.0"
      };
      
      // Contoh ID kartu NFC untuk simulasi
      this.mockCardIds = [
        "04A2B1C3D4E5",
        "15F26738A9B0",
        "C7D8E9F01234",
        "5678ABCD9012"
      ];
      
      // Interval untuk polling simulasi
      this.pollingInterval = null;
      this.onCardDetectedCallback = null;
    }
    
    /**
     * Cek status perangkat NFC
     * @returns {Promise<Object>} Status perangkat
     */
    checkStatus() {
      return new Promise((resolve) => {
        // Simulasi delay network
        setTimeout(() => {
          // 70% kemungkinan perangkat terdeteksi
          const detected = Math.random() < 0.7;
          this.isConnected = detected;
          
          if (detected) {
            resolve({
              connected: true,
              deviceInfo: this.deviceInfo,
              message: "Perangkat ACS ACR122U terhubung dan siap digunakan."
            });
          } else {
            resolve({
              connected: false,
              message: "Perangkat ACS ACR122U tidak ditemukan. Mode simulasi aktif."
            });
          }
        }, 800); // Simulasi delay 800ms
      });
    }
    
    /**
     * Memulai polling untuk kartu NFC
     * @returns {Promise<Object>} Status polling
     */
    startPolling() {
      return new Promise((resolve) => {
        this.isPolling = true;
        
        // Simulasi delay network
        setTimeout(() => {
          resolve({
            status: "polling_started",
            message: "[SIMULASI] Berhasil memulai pemindaian kartu NFC."
          });
          
          // Mulai interval simulasi deteksi kartu
          this.pollingInterval = setInterval(() => {
            if (!this.isPolling) {
              clearInterval(this.pollingInterval);
              return;
            }
            
            // 30% kemungkinan mendeteksi kartu setiap interval
            if (Math.random() < 0.3) {
              const cardId = this.mockCardIds[Math.floor(Math.random() * this.mockCardIds.length)];
              this.detectCard().then(result => {
                if (this.onCardDetectedCallback && result.detected) {
                  this.onCardDetectedCallback(result);
                }
              });
            }
          }, 3000); // Simulasi pemindaian setiap 3 detik
          
        }, 500);
      });
    }
    
    /**
     * Mendeteksi kartu NFC
     * @returns {Promise<Object>} Hasil deteksi kartu
     */
    detectCard() {
      return new Promise((resolve) => {
        // Jika tidak dalam mode polling, selalu return tidak terdeteksi
        if (!this.isPolling) {
          resolve({
            detected: false,
            message: "Pemindaian tidak aktif."
          });
          return;
        }
        
        // Simulasi delay network
        setTimeout(() => {
          // 40% kemungkinan mendeteksi kartu saat dipanggil
          const detected = Math.random() < 0.4;
          
          if (detected) {
            const cardId = this.mockCardIds[Math.floor(Math.random() * this.mockCardIds.length)];
            resolve({
              detected: true,
              cardId: cardId,
              cardType: "MIFARE Classic 1K (Simulated)",
              timestamp: new Date().toISOString()
            });
          } else {
            resolve({
              detected: false,
              message: "Tidak ada kartu terdeteksi."
            });
          }
        }, 300);
      });
    }
    
    /**
     * Menghentikan polling kartu NFC
     * @returns {Promise<Object>} Status polling
     */
    stopPolling() {
      return new Promise((resolve) => {
        this.isPolling = false;
        
        if (this.pollingInterval) {
          clearInterval(this.pollingInterval);
          this.pollingInterval = null;
        }
        
        // Simulasi delay network
        setTimeout(() => {
          resolve({
            status: "polling_stopped",
            message: "[SIMULASI] Pemindaian kartu dihentikan."
          });
        }, 300);
      });
    }
    
    /**
     * Mendaftarkan callback untuk event deteksi kartu
     * @param {Function} callback - Fungsi yang dipanggil saat kartu terdeteksi
     */
    onCardDetected(callback) {
      this.onCardDetectedCallback = callback;
    }
    
    /**
     * Mengatur waktu delay simulasi untuk testing UI
     * @param {Object} config - Konfigurasi delay
     */
    setSimulationConfig(config) {
      // Fungsi untuk kustomisasi simulasi jika diperlukan
      if (config.detectProbability !== undefined) {
        this.detectProbability = config.detectProbability;
      }
    }
  }
  
  // Buat instance singleton
  const mockAcr122uService = new MockAcr122uService();
  
  export default mockAcr122uService;