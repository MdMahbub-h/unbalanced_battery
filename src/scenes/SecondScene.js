import { Battery } from "./Elements/Battery";

class SecondScene extends Phaser.Scene {
  constructor() {
    super({ key: "SecondScene" });
    this.battery1Voltage = 3.4;
    this.battery2Voltage = 4;
    this.motorSpinning = false;
    this.spinCount = 0;
    this.chargesUsed = 0;
    this.chargeCount = 0;
  }

  create() {
    // this.scene.start("CompareScene");

    this.width = this.scale.width;
    this.height = this.scale.height;
    this.bgAndHeading();
    this.createWireAndMotor();
    this.createBatteries();

    this.balanceButton = this.add.graphics();
    this.balanceButton = this.drawButton(
      this.balanceButton,
      this.width * 0.8,
      this.height * 0.4,
      this.width * 0.23,
      this.width * 0.08,
      this.width * 0.04
    );
    this.balanceButton.setInteractive(
      new Phaser.Geom.Rectangle(
        this.width * 0.8 - this.width * 0.115,
        this.height * 0.4 - (this.width * 0.1) / 2,
        this.width * 0.23,
        this.width * 0.1
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.balanceButtonText = this.add
      .text(this.width * 0.8, this.height * 0.4, "Balance", {
        font: "bold 28px Helvetica",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.balanceButton.input.cursor = "pointer";
    this.balanceButton.on("pointerdown", () => {
      this.balanceBatteries();
      this.balanceButton.alpha = 0.3;
      this.balanceButton.alpha = 0.3;
      this.balanceButtonText.alpha = 0.3;
      this.balanceButton.input.cursor = "default";
      this.balanceButton.off("pointerdown");
    });

    this.spinCountText = this.add
      .text(this.width * 0.8, this.height * 0.59, this.spinCount, {
        font: "bold 50px Helvetica",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.spinButton = this.add.graphics();
    this.spinButton = this.drawButton(
      this.spinButton,
      this.width * 0.8,
      this.height * 0.655,
      this.width * 0.23,
      this.scale.width * 0.08,
      3
    );

    this.spinButton.setInteractive(
      new Phaser.Geom.Rectangle(
        this.width * 0.8 - this.width * 0.115,
        this.height * 0.555 + this.scale.width * 0.08,
        this.width * 0.23,
        this.scale.width * 0.1
      ),
      Phaser.Geom.Rectangle.Contains
    );

    this.spinText = this.add
      .text(this.width * 0.8, this.height * 0.655, "Spin", {
        font: "bold 28px Helvetica",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.spinButton.alpha = 0.3;
    this.spinText.alpha = 0.3;

    this.chargeCountText = this.add
      .text(this.width * 0.8, this.height * 0.73, this.chargeCount, {
        font: "bold 50px Helvetica",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.chargeButton = this.add.graphics();
    this.chargeButton = this.drawButton(
      this.chargeButton,
      this.width * 0.8,
      this.height * 0.795,
      this.width * 0.23,
      this.scale.width * 0.08,
      3
    );
    this.chargeButton.setInteractive(
      new Phaser.Geom.Rectangle(
        this.width * 0.8 - this.width * 0.115,
        this.height * 0.695 + this.width * 0.08,
        this.width * 0.23,
        this.scale.width * 0.1
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.chargeText = this.add
      .text(this.width * 0.8, this.height * 0.795, "Charge", {
        font: "bold 28px Helvetica",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.chargeButton.alpha = 0.3;
    this.chargeText.alpha = 0.3;
    // this.chargeBatteries();
    this.switchOff();
    // this.secondSceneComplete();
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
        "Let's see again how many charges need\nto spin this motor 100 times this time ?\n Let's balance batteries.",
        {
          fontSize: "24px",
          fill: "#ffffff",
          fontFamily: "Microsoft Sans Serif",
          fontStyle: "bold",
          align: "center",
        }
      )
      .setOrigin(0.5, 0);
  }
  createWireAndMotor() {
    this.cable = this.add.graphics();
    this.cable.lineStyle(5, 0xffffff, 1);
    let wireWidth = this.width * 0.29;
    let wireHeight = this.height * 0.565;
    let wireCornerRadius = 7;
    this.cable.strokeRoundedRect(
      this.width * 0.288,
      this.height * 0.26,
      wireWidth,
      wireHeight,
      wireCornerRadius
    );

    let motorX = this.width * 0.58;
    let motorY = this.height * 0.55;
    let motorWidth = this.width * 0.2;
    let motorStroke = 5;

    this.motor = this.add.graphics();
    this.motor.lineStyle(motorStroke, 0xffffff, 1);
    this.motor.fillStyle(0x202025, 1); // Use 1 for full opacity
    this.motor.strokeCircle(0, 0, motorWidth / 2);
    this.motor.fillCircle(0, 0, motorWidth / 2 - motorStroke / 2);

    this.motorM = this.add.text(0, 0, "M", {
      font: "bold 70px Helvetica",
      fill: "#ffffff",
    });
    this.motorM.setOrigin(0.5, 0.5);

    this.motor.setPosition(motorX, motorY);
    this.motorM.setPosition(motorX, motorY);
  }
  createBatteries() {
    this.battery1 = new Battery(
      this,
      this.width * 0.2,
      this.height * 0.3,
      this.width,
      this.height,
      this.battery1Voltage
    );
    this.battery2 = new Battery(
      this,
      this.width * 0.2,
      this.height * 0.6,
      this.width,
      this.height,
      this.battery2Voltage
    );
    this.battery1.updateBattery(this.battery1Voltage);
    this.battery2.updateBattery(this.battery2Voltage);
  }

  drawButton(button, x, y, width, height, radius) {
    button.fillStyle(0x000000, 1);
    button.lineStyle(5, 0xffffff, 1);
    button.fillRoundedRect(
      x - width / 2,
      y - height / 2,
      width,
      height,
      radius
    );
    button.strokeRoundedRect(
      x - width / 2,
      y - height / 2,
      width,
      height,
      radius
    );
    return button;
  }
  balanceBatteries() {
    this.headingText.setY(this.height * 0.165);
    this.headingText.setText("Balancing...");
    this.wireX = 5;
    this.wireY = this.height * 0.26;
    let wireEndX = this.width * 0.29;
    this.chargingCable1 = this.add.graphics();
    this.chargingCable2 = this.add.graphics();
    this.chargingCable1.lineStyle(5, 0xffffff, 1);
    this.chargingCable2.lineStyle(5, 0xffffff, 1);
    this.progressX = this.wireX;
    let revealSpeed = 5;
    let updateWire = () => {
      if (this.progressX < wireEndX) {
        this.progressX += revealSpeed;
        this.chargingCable1.clear();
        this.chargingCable1.lineStyle(6, 0xaf1000, 1);
        this.chargingCable1.beginPath();
        this.chargingCable1.moveTo(this.wireX, this.wireY);
        this.chargingCable1.lineTo(this.progressX, this.wireY);
        this.chargingCable1.strokePath();

        this.chargingCable2.clear();
        this.chargingCable2.lineStyle(6, 0x002faf, 1);
        this.chargingCable2.beginPath();
        this.chargingCable2.moveTo(
          this.wireX,
          this.wireY + (this.height * 0.565) / 2
        );
        this.chargingCable2.lineTo(
          this.progressX,
          this.wireY + (this.height * 0.565) / 2
        );
        this.chargingCable2.strokePath();
        this.chargingCable1.setDepth(-1);
        this.chargingCable2.setDepth(-1);
        this.time.delayedCall(16, updateWire, [], this);
      }

      if (this.progressX > wireEndX) {
        this.balancing();
      }
    };
    updateWire();

    this.chargeButton.alpha = 0.3;
    this.chargeText.alpha = 0.3;
    this.chargeCount += 1;
    this.chargeCountText.setText(this.chargeCount);
    this.chargeButton.input.cursor = "default";
  }
  balancing() {
    const incrementVoltage = () => {
      if (this.battery1Voltage < this.battery2Voltage) {
        this.battery1Voltage = Math.min(this.battery1Voltage + 0.01, 4.2);
        // this.battery2Voltage = Math.min(this.battery2Voltage + 0.02, 4.2);
        this.battery1Voltage = Math.round(this.battery1Voltage * 100) / 100;
        // this.battery2Voltage = Math.round(this.battery2Voltage * 100) / 100;
        this.battery1.updateBattery(this.battery1Voltage);
        // this.battery2.updateBattery(this.battery2Voltage);
      }
      let hideSpeed = 5; // Speed at which the cable disappears

      let hideWire = () => {
        if (this.progressX > this.wireX) {
          this.progressX -= hideSpeed;

          this.chargingCable1.clear();
          this.chargingCable1.lineStyle(5, 0xaf1000, 1);
          this.chargingCable1.beginPath();
          this.chargingCable1.moveTo(this.wireX, this.wireY);
          this.chargingCable1.lineTo(this.progressX, this.wireY);
          this.chargingCable1.strokePath();

          this.chargingCable2.clear();
          this.chargingCable2.lineStyle(5, 0x002faf, 1);
          this.chargingCable2.beginPath();
          this.chargingCable2.moveTo(
            this.wireX,
            this.wireY + (this.height * 0.565) / 2
          );
          this.chargingCable2.lineTo(
            this.progressX,
            this.wireY + (this.height * 0.565) / 2
          );
          this.chargingCable2.strokePath();

          this.time.delayedCall(16, hideWire, [], this);
        } else {
          // Fully cleared

          this.balanceButtonText.setText("Balanced");
          this.headingText.setText("Batteries balanced. Now spin.");
          this.chargingCable1.clear();
          this.chargingCable2.clear();
          this.chargeComplete();
        }
      };
      if (this.battery1Voltage >= this.battery2Voltage) {
        hideWire();
      } else {
        setTimeout(incrementVoltage, 150);
      }
    };

    incrementVoltage();
  }
  spinMotor() {
    this.spinButton.off("pointerdown");
    this.spinButton.input.cursor = "default";
    this.spinButton.alpha = 0.3;
    this.spinText.alpha = 0.3;
    if (
      this.battery1Voltage > 3.1 &&
      this.battery2Voltage > 3.1 &&
      this.spinCount < 100
    ) {
      this.motorRotationTween = this.tweens.add({
        targets: this.motorM,
        angle: 360,
        duration: 300,
        repeat: 0,
        onComplete: () => {
          this.motor.angle = 0;
          this.battery1Voltage -= 0.02;
          this.battery2Voltage -= 0.02;
          this.spinCount += 1;
          this.battery1Voltage = Math.round(this.battery1Voltage * 100) / 100;
          this.battery2Voltage = Math.round(this.battery2Voltage * 100) / 100;
          this.battery1.updateBattery(this.battery1Voltage);
          this.battery2.updateBattery(this.battery2Voltage);
          this.spinCountText.setText(this.spinCount);

          if (this.spinCount == 100) {
            this.spinCountText
              .setStroke("#000000", 2)
              .setShadow(5, 5, "#007bff", 10, true, true);
            this.secondSceneComplete();
            this.headingText.setText(
              "We have reached at 100 spin.\nLet's compare them."
            );
            this.motorRotationTween.destroy();
          }
          this.oneRotationComplete();
        },
      });
    }
  }
  oneRotationComplete() {
    if (this.battery1Voltage == 3.1 || this.battery2Voltage == 3.1) {
      if (this.spinCount < 100) {
        this.chargeAble();
      }
      this.motorRotationTween.destroy();
    } else {
      this.spinMotor();
    }
  }
  chargeAble() {
    this.chargeButton.alpha = 1;
    this.chargeText.alpha = 1;
    this.chargeButton.input.cursor = "pointer";
    this.headingText.setText(
      "Charge of both batteries are finished.\nCharge them."
    );
    this.chargeButton.on("pointerdown", () => this.chargeBatteries());
  }
  chargeBatteries() {
    this.chargeButton.off("pointerdown");
    this.headingText.setText("Charging...");
    this.switchOff();
    this.wireX = 5;
    this.wireY = this.height * 0.26;
    let wireEndX = this.width * 0.29;
    this.chargingCable1 = this.add.graphics();
    this.chargingCable2 = this.add.graphics();
    this.chargingCable1.lineStyle(5, 0xffffff, 1);
    this.chargingCable2.lineStyle(5, 0xffffff, 1);
    this.progressX = this.wireX;
    let revealSpeed = 5;
    let updateWire = () => {
      if (this.progressX < wireEndX) {
        this.progressX += revealSpeed;
        this.chargingCable1.clear();
        this.chargingCable1.lineStyle(6, 0xaf1000, 1);
        this.chargingCable1.beginPath();
        this.chargingCable1.moveTo(this.wireX, this.wireY);
        this.chargingCable1.lineTo(this.progressX, this.wireY);
        this.chargingCable1.strokePath();

        this.chargingCable2.clear();
        this.chargingCable2.lineStyle(6, 0x002faf, 1);
        this.chargingCable2.beginPath();
        this.chargingCable2.moveTo(
          this.wireX,
          this.wireY + this.height * 0.565
        );
        this.chargingCable2.lineTo(
          this.progressX,
          this.wireY + this.height * 0.565
        );
        this.chargingCable2.strokePath();
        this.chargingCable1.setDepth(-1);
        this.chargingCable2.setDepth(-1);
        this.time.delayedCall(16, updateWire, [], this);
      }

      if (this.progressX > wireEndX) {
        this.charging();
      }
    };
    updateWire();

    this.chargeButton.alpha = 0.3;
    this.chargeText.alpha = 0.3;
    this.chargeCount += 1;
    this.chargeCountText.setText(this.chargeCount);
    this.chargeButton.input.cursor = "default";
  }

  charging() {
    const incrementVoltage = () => {
      if (this.battery1Voltage < 4.2 && this.battery2Voltage < 4.2) {
        this.battery1Voltage = Math.min(this.battery1Voltage + 0.01, 4.2);
        this.battery2Voltage = Math.min(this.battery2Voltage + 0.01, 4.2);
        this.battery1Voltage = Math.round(this.battery1Voltage * 100) / 100;
        this.battery2Voltage = Math.round(this.battery2Voltage * 100) / 100;
        this.battery1.updateBattery(this.battery1Voltage);
        this.battery2.updateBattery(this.battery2Voltage);
      }
      let hideSpeed = 5; // Speed at which the cable disappears

      let hideWire = () => {
        if (this.progressX > this.wireX) {
          this.progressX -= hideSpeed;

          this.chargingCable1.clear();
          this.chargingCable1.lineStyle(5, 0xaf1000, 1);
          this.chargingCable1.beginPath();
          this.chargingCable1.moveTo(this.wireX, this.wireY);
          this.chargingCable1.lineTo(this.progressX, this.wireY);
          this.chargingCable1.strokePath();

          this.chargingCable2.clear();
          this.chargingCable2.lineStyle(5, 0x002faf, 1);
          this.chargingCable2.beginPath();
          this.chargingCable2.moveTo(
            this.wireX,
            this.wireY + this.height * 0.565
          );
          this.chargingCable2.lineTo(
            this.progressX,
            this.wireY + this.height * 0.565
          );
          this.chargingCable2.strokePath();

          this.time.delayedCall(16, hideWire, [], this);
        } else {
          // Fully cleared
          this.chargingCable1.clear();
          this.chargingCable2.clear();
          this.chargeComplete();
          this.headingText.setText("Charged. Spin again.");
        }
      };
      if (this.battery1Voltage >= 4.2 || this.battery2Voltage >= 4.2) {
        hideWire();
      } else {
        setTimeout(incrementVoltage, 150);
      }
    };

    incrementVoltage();
  }

  chargeComplete() {
    this.spinButton.alpha = 1;
    this.spinText.alpha = 1;
    this.spinButton.input.cursor = "pointer";
    this.spinButton.off("pointerdown");
    this.spinButton.on("pointerdown", () => this.switchOn());
    console.log(this.battery1Voltage, "chargeCompleted");
  }
  switchOff() {
    this.switchBackground = this.add.graphics();
    this.switchBackground.fillStyle(0x202025, 1);
    this.switchBackground.fillRect(
      this.width * 0.581 - 5,
      this.height * 0.4 - 48,
      7,
      46
    );

    this.switch = this.add.graphics({
      lineStyle: { width: 10, color: 0xffffff },
    });
    this.switch.strokeLineShape(new Phaser.Geom.Line(0, -50, 0, 50));
    this.switch.generateTexture("lineTexture", 10, 100);
    this.switch.destroy();

    this.switchImage = this.add
      .image(this.width * 0.581, this.height * 0.4, "lineTexture")
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: this.switchImage,
      angle: 20,
      duration: 500,
      repeat: 0,
      ease: "Linear",
    });
  }
  switchOn() {
    this.tweens.add({
      targets: this.switchImage,
      angle: 0,
      duration: 500,
      repeat: 0,
      ease: "Linear",
      onComplete: () => {
        this.switch.destroy();
        this.switchBackground.destroy();
        this.headingText.setText("Spinning...");
        this.spinMotor();
      },
    });
  }

  secondSceneComplete() {
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
      this.scene.start("CompareScene");
    });
    this.nextButtonText = this.add
      .text(
        this.width * 0.5,
        this.height * 0.89,
        "COMPARE WITH PREVIOUS CONDITION",
        {
          fontSize: "17px",
          fill: "#ffffff",
          fontFamily: "Microsoft Sans Serif",
          fontStyle: "bold",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
  }
}

export { SecondScene };
