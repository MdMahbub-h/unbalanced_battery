class VideoScene extends Phaser.Scene {
  constructor() {
    super({ key: "VideoScene" });
  }

  preload() {
    // Update asset paths
    this.load.image("nextButton", "assets/nextButton.png");
    this.load.image("nextButtonHover", "assets/nextButtonHover.png");

    this.load.video("introVideo", "assets/video.mp4");
  }

  create() {
    console.log("videoScene");
    // this.scene.start("FirstScene");
    this.width = this.scale.width;
    this.height = this.scale.height;

    const graphics = this.add.graphics();
    graphics.fillStyle(0x202025, 0.9);
    const width = this.width * 0.7;
    const height = this.height * 0.97;
    const x = this.width * 0.5 - width / 2;
    const y = this.height * 0.015;

    const radius = 15;
    graphics.fillRoundedRect(x, y, width, height, radius);
    this.rectangleBoxWithFade = graphics;
    this.rectangleBoxWithFade.setDepth(-2);

    const video = this.add.video(
      this.width * 0.5,
      this.height * 0.46,
      "introVideo"
    );
    video.setOrigin(0.5, 0.5);
    video.setScale((0.48 * this.height) / 991);
    video.play(false);
    const videoElement = video.video;
    videoElement.controls = true;
    videoElement.loop = false;

    videoElement.addEventListener("ended", () => {
      video.setPaused(true);
    });

    this.VideoSceneBtn();
  }
  VideoSceneBtn() {
    this.nextButton = this.add.image(
      this.width * 0.5,
      this.height * 0.93,
      "nextButton"
    );
    this.nextButton.setDisplaySize(this.width * 0.63, this.height * 0.045);
    this.nextButton.setInteractive({ cursor: "pointer" });
    this.nextButton.on("pointerover", () => {
      this.nextButton.setTexture("nextButtonHover");
    });
    this.nextButton.on("pointerout", () => {
      this.nextButton.setTexture("nextButton");
    });
    this.nextButton.on("pointerdown", () => {
      this.scene.start("FirstScene");
    });
    this.add
      .text(this.width * 0.5, this.height * 0.93, "LET'S SEE DEMO", {
        fontSize: "17px",
        fill: "#ffffff",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }
}

export { VideoScene };
