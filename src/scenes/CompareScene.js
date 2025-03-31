import { Battery } from "./Elements/Battery";

class CompareScene extends Phaser.Scene {
  constructor() {
    super("CompareScene");
    this.battery1Voltage = 3.4;
    this.battery2Voltage = 4;
    this.battery3Voltage = 4;
    this.battery4Voltage = 4;
  }
  create() {
    // this.scene.start("")

    this.width = this.scale.width;
    this.height = this.scale.height;
    this.bgAndHeading();
    this.createWire();
    this.createBatteries();
    this.compareSceneComplete();
  }
  bgAndHeading() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x202025, 0.9);
    const x = this.width * 0.5 - (this.width - 10) / 2;
    const y = this.height * 0.5 - (this.height * 0.8) / 2;
    const width = this.width - 10;
    const height = this.height * 0.85;
    const radius = 15;
    graphics.fillRoundedRect(x, y, width, height, radius);
    this.rectangleBoxWithFade = graphics;
    this.rectangleBoxWithFade.setDepth(-2);
    this.cameras.main.setBackgroundColor("#000000");

    this.headingText = this.add
      .text(
        this.width / 2,
        this.height * 0.15,
        "Balanced batteries have more range\nand need to go through fewer cycles",
        {
          fontSize: "24px",
          fill: "#ffffff",
          fontFamily: "Microsoft Sans Serif",
          fontStyle: "bold",
          align: "center",
        }
      )
      .setOrigin(0.5, 0);
    this.balanceText = this.add
      .text(this.width * 0.68, this.height * 0.24, "Balanced:", {
        fontSize: "28px",
        fill: "#5555dd",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0);
    this.unBalanceText = this.add
      .text(this.width * 0.3, this.height * 0.24, "Unbalanced:", {
        fontSize: "28px",
        fill: "#880000",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0);
    this.balanceSpinCount = this.add
      .text(this.width * 0.65, this.height * 0.295, 2, {
        fontSize: "50px",
        fill: "#5555dd",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0);
    this.unBalanceSpinCount = this.add
      .text(this.width * 0.25, this.height * 0.295, 4, {
        fontSize: "50px",
        fill: "#880000",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0);
    this.balanceChargeCycle = this.add
      .text(this.width * 0.72, this.height * 0.3, "charge\ncycle", {
        fontSize: "20px",
        fill: "#5555dd",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0);
    this.unBalanceChargeCycle = this.add
      .text(this.width * 0.32, this.height * 0.3, "charge\ncycle", {
        fontSize: "20px",
        fill: "#880000",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0);
  }
  createWire() {
    this.wire = this.add.graphics({
      lineStyle: { width: 10, color: 0xffffff },
    });
    this.wire.strokeLineShape(new Phaser.Geom.Line(0, -100, 0, 100));
    this.wire.generateTexture("lineTexture", 10, 100);
    this.wire.destroy();

    this.wire1Image = this.add
      .image(this.width * 0.291, this.height * 0.6, "lineTexture")
      .setOrigin(0.5, 0.5);
    this.wire2Image = this.add
      .image(this.width * 0.691, this.height * 0.6, "lineTexture")
      .setOrigin(0.5, 0.5);
  }
  createBatteries() {
    this.battery1 = new Battery(
      this,
      this.width * 0.2,
      this.height * 0.38,
      this.width,
      this.height,
      this.battery1Voltage
    );
    this.battery2 = new Battery(
      this,
      this.width * 0.2,
      this.height * 0.63,
      this.width,
      this.height,
      this.battery2Voltage
    );
    this.battery3 = new Battery(
      this,
      this.width * 0.6,
      this.height * 0.38,
      this.width,
      this.height,
      this.battery1Voltage
    );
    this.battery4 = new Battery(
      this,
      this.width * 0.6,
      this.height * 0.63,
      this.width,
      this.height,
      this.battery2Voltage
    );
    this.battery1.updateBattery(this.battery1Voltage);
    this.battery2.updateBattery(this.battery2Voltage);
    this.battery3.updateBattery(this.battery3Voltage);
    this.battery4.updateBattery(this.battery4Voltage);
  }
  compareSceneComplete() {
    this.headingText.setText(
      "We have reached at 100 spin.\nLet's see another condition."
    );

    this.nextButton = this.add.image(
      this.width * 0.5,
      this.height * 0.89,
      "nextButton"
    );
    this.nextButton.setDisplaySize(this.width * 0.7, this.height * 0.05);

    this.nextButton.setInteractive({ cursor: "pointer" });

    this.nextButton.on("pointerover", () => {
      this.nextButton.setTexture("nextButtonHover");
    });

    this.nextButton.on("pointerout", () => {
      this.nextButton.setTexture("nextButton");
    });

    this.nextButton.on("pointerdown", () => {
      this.scene.start("SecondScene");
    });

    this.nextButtonText = this.add
      .text(this.width * 0.5, this.height * 0.89, "NEXT", {
        fontSize: "17px",
        fill: "#ffffff",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    // this.scene.start("SecondScene");
  }
}
export { CompareScene };
