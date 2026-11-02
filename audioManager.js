
class AudioManager {
  constructor() {
    // BGMと効果音を保存する
    this.bgm = {};
    this.se = {};

    // 現在再生しているBGM
    this.currentBGM = null;
    this.currentBGMName = null;

    // 音量設定
    this.bgmVolume = 0.3;
    this.seVolume = 0.45;
    // 再生中の効果音を管理
    this.playingSE = [];
  }

  // BGMを登録
  addBGM(name, path) {
    const audio = new Audio(path);
    audio.loop = true;
    audio.volume = this.bgmVolume;

    this.bgm[name] = audio;
  }

  // 効果音を登録
  addSE(name, path) {
    const audio = new Audio(path);
    audio.volume = this.seVolume;

    this.se[name] = audio;
  }

  // BGMを再生
  playBGM(name) {
    const audio = this.bgm[name];

    if (!audio) {
      console.warn(`BGMが見つかりません: ${name}`);
      return;
    }

    // 同じBGMが再生中なら何もしない
    if (this.currentBGMName === name && !audio.paused) {
      return;
    }

    // 現在のBGMを停止
    this.stopBGM();

    // 新しいBGMを再生
    this.currentBGM = audio;
    this.currentBGMName = name;

    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn("BGMを再生できませんでした", error);
    });
  }

  // BGMを停止
  stopBGM() {
    if (this.currentBGM) {
      this.currentBGM.pause();
      this.currentBGM.currentTime = 0;
    }

    this.currentBGM = null;
    this.currentBGMName = null;
  }

  // 効果音を再生
  playSE(name) {
    console.trace("効果音が呼び出されました:", name);
    const original = this.se[name];

    if (!original) {
      console.warn(`効果音が見つかりません: ${name}`);
      return;
    }
     // 効果音を複製
    const audio = original.cloneNode();
    audio.volume = this.seVolume;
    // 再生中の効果音を保存
    this.playingSE.push({
      name: name,
      audio: audio
    });

    // 再生が終了したら配列から削除
    audio.addEventListener("ended", () => {
      this.playingSE = this.playingSE.filter(
        item => item.audio !== audio
      );
    });

    audio.play().catch(error => {
      this.playingSE = this.playingSE.filter(
        item => item.audio !== audio
      );
      console.warn("効果音を再生できませんでした", error);
    });
  }
  stopSE(name) {
    this.playingSE = this.playingSE.filter(item => {
      if (item.name === name) {
        item.audio.pause();
        item.audio.currentTime = 0;
        return false;
      }

      return true;
    });
  }

  // BGMの音量を変更
  setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));

    Object.values(this.bgm).forEach(audio => {
      audio.volume = this.bgmVolume;
    });
  }

  // 効果音の音量を変更
  setSEVolume(volume) {
    this.seVolume = Math.max(0, Math.min(1, volume));
  }
}
