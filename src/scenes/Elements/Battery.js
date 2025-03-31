class Battery {
  constructor(scene, x, y, width, height, voltage) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.voltage = voltage;
    this.width = width;
    this.height = height;
    this.battery = this.createBattery();
    this.chargeText = this.createchargeText();
    this.voltageText = this.createVoltageText();
  }

  createBattery() {
    const batteryStroke = 4;
    const battery = this.scene.add.graphics();
    battery.lineStyle(batteryStroke, 0xffffff, 1);

    const batteryWidth = this.width * 0.175;
    const batteryHeight = this.height * 0.2;
    const cornerRadius = 7;
    battery.strokeRoundedRect(0, 0, batteryWidth, batteryHeight, cornerRadius);

    // Fill the battery with the desired color
    battery.fillStyle(0x202025, 1);
    battery.fillRoundedRect(
      batteryStroke / 2,
      batteryStroke / 2,
      batteryWidth - batteryStroke,
      batteryHeight - batteryStroke,
      cornerRadius
    );

    const terminalWidth = 22;
    const terminalHeight = 12;
    const terminalX = batteryWidth / 2 - terminalWidth / 2;
    const terminalY = -terminalHeight;

    // Fill the terminal with the desired color
    battery.fillStyle(0xffffff, 1);
    battery.fillRect(
      terminalX,
      terminalY + 5,
      terminalWidth,
      terminalHeight - 5
    );
    battery.strokeRect(
      terminalX,
      terminalY + 5,
      terminalWidth,
      terminalHeight - 5
    );

    battery.fillEllipse(
      terminalX + terminalWidth / 2,
      terminalY + terminalHeight / 2,
      terminalWidth,
      terminalHeight
    );
    battery.strokeEllipse(
      terminalX + terminalWidth / 2,
      terminalY + terminalHeight / 2,
      terminalWidth,
      terminalHeight
    );

    battery.setPosition(this.x, this.y);

    return battery;
  }

  createchargeText() {
    const batteryWidth = this.width * 0.175;
    const batteryHeight = this.height * 0.2;
    let chargeText = this.scene.add.text(
      0,
      0,
      `${Math.round(((this.voltage - 3.1) / 1.1) * 100)}%`,
      {
        fontSize: "30px",
        fill: "#ffffff",
        fontFamily: "Microsoft Sans Serif",
        fontStyle: "bold",
        align: "center",
      }
    );
    chargeText.setOrigin(0.5, 0.5);
    chargeText.setPosition(
      this.x + batteryWidth / 2,
      this.y + batteryHeight / 2 - 20
    );
    return chargeText;
  }
  createVoltageText() {
    const batteryWidth = this.width * 0.175;
    const batteryHeight = this.height * 0.2;
    const voltageText = this.scene.add.text(0, 0, `${this.voltage}V`, {
      fontSize: "30px",
      fill: "#ffffff",
      fontFamily: "Microsoft Sans Serif",
      fontStyle: "bold",
    });
    voltageText.setOrigin(0.5, 0.5);
    voltageText.setPosition(
      this.x + batteryWidth / 2,
      this.y + batteryHeight / 2 + 20
    );
    return voltageText;
  }

  updateBattery(voltage) {
    let batteryVoltage = Math.round(voltage * 100) / 100;
    let chargeLevel = Math.round(((batteryVoltage - 3.1) * 100) / 1.1) / 100;
    const batteryStroke = 4;
    const batteryWidth = this.width * 0.175;
    const batteryHeight = this.height * 0.2;
    const cornerRadius = 7;

    this.battery.clear();

    this.battery.lineStyle(batteryStroke, 0xffffff, 1);
    this.battery.strokeRoundedRect(
      0,
      0,
      batteryWidth,
      batteryHeight,
      cornerRadius
    );

    this.battery.fillStyle(0x202025, 1);
    this.battery.fillRoundedRect(
      batteryStroke / 2,
      batteryStroke / 2,
      batteryWidth - batteryStroke,
      batteryHeight - batteryStroke,
      cornerRadius
    );

    const chargeHeight = (batteryHeight - batteryStroke) * chargeLevel;

    if (chargeLevel > 0) {
      let fillRed = 220 - chargeLevel * 220;
      let fillGreen = 0;
      let fillBlue = chargeLevel * 220;
      //   if (chargeLevel >= 0.5) {
      //     fillRed = 0;
      //     fillGreen = chargeLevel * 220;
      //     fillBlue = 220 - chargeLevel * 220;
      //   } else {
      //     fillGreen = 0;
      //     fillBlue = chargeLevel * 2 * 220;
      //     fillRed = 220 - chargeLevel * 2 * 220;
      //   }
      this.battery.fillStyle(
        Phaser.Display.Color.GetColor(fillRed, fillGreen, fillBlue),
        1
      );
      const chargeY = batteryHeight - batteryStroke / 2 - chargeHeight;
      this.battery.fillRoundedRect(
        batteryStroke / 2,
        chargeY,
        batteryWidth - batteryStroke,
        chargeHeight,
        cornerRadius
      );
    }

    const terminalWidth = 22;
    const terminalHeight = 12;
    const terminalX = batteryWidth / 2 - terminalWidth / 2;
    const terminalY = -terminalHeight;

    this.battery.fillStyle(0xffffff, 1);
    this.battery.fillRect(
      terminalX,
      terminalY + 5,
      terminalWidth,
      terminalHeight - 5
    );
    this.battery.strokeRect(
      terminalX,
      terminalY + 5,
      terminalWidth,
      terminalHeight - 5
    );

    this.battery.fillEllipse(
      terminalX + terminalWidth / 2,
      terminalY + terminalHeight / 2,
      terminalWidth,
      terminalHeight
    );
    this.battery.strokeEllipse(
      terminalX + terminalWidth / 2,
      terminalY + terminalHeight / 2,
      terminalWidth,
      terminalHeight
    );
    if (chargeLevel < 0) {
      chargeLevel = 0;
    }
    let chargeMulply = Math.round(chargeLevel * 100);

    this.chargeText.setText(chargeMulply + "%");
    this.voltageText.setText(batteryVoltage + " V");
  }

  chargeBattery() {}
}

export { Battery };
