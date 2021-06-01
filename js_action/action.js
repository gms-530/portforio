const damageRange = 0.2;
const criticalHitRate = 0.2;
let logIndex = 0;
let nowKilledNumber = 0;
let targetKillsNumber = 3;
let gSE = [];
let enemyIndex = 0;
let enemyImg = 0;
let enemyFlash = 0;
let s = ["attack.mp3", "defence.mp3", "next.mp3", "monster.mp3"];
for (let i = 0; i < s.length; i++) {
  gSE[i] = new Audio();
  gSE[i].volume = 0.5;
  gSE[i].src = s[i];
  gSE[i].currentTime = 0;
}

const currentEnemyHpGaugeValue = document.getElementById(
  "currentEnemyHpGaugeValue"
);
const currentPlayerHpGaugeValue = document.getElementById(
  "currentPlayerHpGaugeValue"
);

const playerData = {
  name: "プレイヤー",
  hp: 10000,
  attack: 3000,
  defence: 200,
};

const enemiesData = [
  {
    name: "スライム",
    hp: 5000,
    attack: 600,
    defence: 2000,
  },
  {
    name: "はぐれメタル",
    hp: 500,
    attack: 100,
    defence: 3000,
  },
  {
    name: "ゾーマ",
    hp: 30000,
    attack: 1000,
    defence: 200,
  },
];

console.log(enemiesData[0]);

for (let i = 0; i < enemiesData.length; i++) {
  enemiesData[i]["maxHp"] = enemiesData[i]["hp"];
}

let enemyData = enemiesData[enemyIndex++];

// let enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

playerData["maxHp"] = playerData["hp"];

function insertText(id, text) {
  document.getElementById(id).textContent = text;
}

function damageCalculation(attack, defence) {
  const maxDamage = attack * (1 + damageRange),
    minDamage = attack * (1 - damageRange),
    attackDamage = Math.floor(
      Math.random() * (maxDamage - minDamage) + minDamage
    );
  const damage = attackDamage - defence;
  if (damage < 1) {
    return 0;
  } else {
    return damage;
  }
}

function insertLog(texts) {
  const logsElement = document.getElementById("logs"),
    createLog = document.createElement("li");
  createLog.innerHTML = texts;
  logsElement.insertBefore(createLog, logsElement.firstChild);
}

function showModal(title, resetButton = false) {
  document.getElementById("mask").classList.add("activ");
  document.getElementById("modal").classList.add("activ");
  document.getElementById("modalTitle").textContent = title;
  if (resetButton) {
    document.getElementById("modalNextButton").style.display = "none";
    document.getElementById("resetButton").classList.add("activ");
  }
}

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);

insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

insertText("nowKilledNumber", nowKilledNumber);
insertText("targetKillsNumber", targetKillsNumber);

document.getElementById("attack").addEventListener("click", function () {
  gSE[0].play();

  let timer1; // インターバルタイマーのID
  let counter = 5 * 2; //点滅させたい回数×２
  function flash(imgName) {
    function a() {
      counter--; //カウンターを１減少して０になったら、タイマーをクリア
      if (counter == 0) {
        clearInterval(timer1);
        document.getElementById(imgName).style.visibility = "visible";
        return;
      }
      let flga = document.getElementById(imgName).style.visibility;
      if (flga == "visible") {
        document.getElementById(imgName).style.visibility = "hidden";
      } else {
        document.getElementById(imgName).style.visibility = "visible";
      }
    }
    function tmstr() {
      timer1 = setInterval(a, 100);
    }
    tmstr();
  }
  if (enemyFlash === 0) {
    flash("srym")
  } else if (enemyFlash === 1) {
    flash("hgr")
  } else {
    flash("zoma")
  }


  const playerName =
    '<span class="playerName">' + playerData["name"] + "</span>";
  const enemyName = '<span class="enemyName">' + enemyData["name"] + "</span>";
  let victory = false,
    defeat = false;
  let playerDamage = damageCalculation(
    playerData["attack"],
    enemyData["defence"]
  );
  if (Math.random() < criticalHitRate) {
    playerDamage *= 2;
    insertLog(
      playerName +
        "の攻撃！！クリティカルヒット！！" +
        enemyName +
        "に" +
        playerDamage +
        "のダメージ！！"
    );
  } else {
    insertLog(
      playerName +
        "の攻撃！！" +
        enemyName +
        "に" +
        playerDamage +
        "のダメージ！！"
    );
  }

  enemyData["hp"] -= playerDamage;
  insertText("currentEnemyHp", enemyData["hp"]);
  currentEnemyHpGaugeValue.style.width =
    (enemyData["hp"] / enemyData["maxHp"]) * 100 + "%";

  this.classList.add("deactive");
  if (enemyData["hp"] <= 0) {
    gSE[2].play();
    victory = true;
    enemyData["hp"] = 0;
    insertText("currentEnemyHp", enemyData["hp"]);
    currentEnemyHpGaugeValue.style.width = "0%";
    showModal(enemyData["name"] + "を倒した");
  }
  function enemyAcction() {
    if (!victory) {
      gSE[1].play();
      let enemyDamage = damageCalculation(
        enemyData["attack"],
        playerData["defence"]
      );
      if (Math.random() < criticalHitRate) {
        playerDamage *= 2;
        insertLog(
          enemyName +
            "の攻撃！！クリティカルヒット！！" +
            playerName +
            "に" +
            enemyDamage +
            "のダメージ！！"
        );
      } else {
        insertLog(
          enemyName +
            "の攻撃！！" +
            playerName +
            "に" +
            enemyDamage +
            "のダメージ！！"
        );
      }
      playerData["hp"] -= enemyDamage;
      insertText("currentPlayerHp", playerData["hp"]);
      currentPlayerHpGaugeValue.style.width =
        (playerData["hp"] / playerData["maxHp"]) * 100 + "%";
    }

    if (playerData["hp"] <= 0) {
      defeat = true;

      playerData["hp"] = 0;
      insertText("currentPlayerHp", playerData["hp"]);
      currentPlayerHpGaugeValue.style.width = "0%";

      showModal(enemyData["name"] + "に敗北した", true);
    }
    document.getElementById("attack").classList.remove("deactive");
  }

  setTimeout(enemyAcction, 1000);

  if (playerData["hp"] <= playerData["maxHp"] * 0.5) {
    currentPlayerHpGaugeValue.style.backgroundColor = "yellow";
  }
  if (playerData["hp"] <= playerData["maxHp"] * 0.2) {
    currentPlayerHpGaugeValue.style.backgroundColor = "red";
  }

  if (enemyData["hp"] <= enemyData["maxHp"] * 0.5) {
    currentEnemyHpGaugeValue.style.backgroundColor = "yellow";
  }
  if (enemyData["hp"] <= enemyData["maxHp"] * 0.2) {
    currentEnemyHpGaugeValue.style.backgroundColor = "red";
  }

  if (victory) {
    nowKilledNumber++;
    insertText("nowKilledNumber", nowKilledNumber);

    if (nowKilledNumber === targetKillsNumber) {
      showModal("クリア", true);
    }
  }
});

document
  .getElementById("modalNextButton")
  .addEventListener("click", function () {
    enemyImg++;
    enemyFlash++;
    if (enemyImg === 1) {
      document.getElementById("srym").classList.add("deactiv");
      document.getElementById("hgr").classList.add("activ");
    } else if (enemyImg === 2) {
      document.getElementById("hgr").classList.remove("activ");
      document.getElementById("zoma").classList.add("activ");
    }
    gSE[3].play();
    enemyData["hp"] = enemyData["maxHp"];
    enemyData = enemiesData[enemyIndex++];
    // enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];
    insertText("enemyName", enemyData["name"]);
    insertText("currentEnemyHp", enemyData["hp"]);
    insertText("maxEnemyHp", enemyData["hp"]);
    currentEnemyHpGaugeValue.style.width = "100%";
    currentEnemyHpGaugeValue.style.backgroundColor = "#6bf";

    document.getElementById("mask").classList.remove("activ");
    document.getElementById("modal").classList.remove("activ");
    document.getElementById("attack").classList.remove("deactive");
  });
