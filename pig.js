"use strict";
//selecting elements
const score0 = document.querySelector("#score-0");
const score1 = document.querySelector("#score-1");
const diceimg = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn-roll");
const btnNew = document.querySelector(".btn-new");
const btnHold = document.querySelector(".btn-hold");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const activeScore = [0, 0];
let currScore = 0;
let active = 0;
let playing = true;

score0.textContent = 0;
score1.textContent = 0;

const remove = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnRoll.addEventListener("click", function () {
  if (activeScore[0] >= 30 || activeScore[1] >= 30) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    overlay.addEventListener("click", remove);
    document.querySelector(".closeModal").addEventListener("click", remove);
    document.querySelector(".notify").textContent = `🎊player-${
      active + 1
    } wins🎊`;
  } else {
    if (playing) {
      const rdm = Math.trunc(Math.random() * 6) + 1;
      diceimg.classList.remove("hidden");
      diceimg.src = `dice-${rdm}.png`;
      if (rdm !== 1) {
        currScore += rdm;
        activeScore[active] += rdm;
        document.getElementById(`current-${active}`).textContent = currScore;
        showActive();
      } else {
        switchPlayer();
      }
    }
  }
});
const removeOverlay = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const showActive = function () {
  document.getElementById(`score-${active}`).textContent = activeScore[active];
};
const switchPlayer = function () {
  currScore = 0;
  document.getElementById(`current-${active}`).textContent = currScore;
  active = active === 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};
btnHold.addEventListener("click", function () {
  if (playing) {
    activeScore[active] += currScore;
    showActive();
    if (activeScore[active] >= 30) {
      playing = false;
      diceimg.classList.add("hidden");
      document
        .querySelector(`.player-${active}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${active}`)
        .classList.remove("player-active");
      overlay.classList.remove("hidden");
      modal.classList.remove("hidden");
      overlay.addEventListener("click", remove);
      document.querySelector(".closeModal").addEventListener("click", remove);
      document.querySelector(".notify").textContent = `🎊player-${
        active + 1
      } wins🎊`;
    } else {
      switchPlayer();
    }
  }
});
const reset = function () {
  diceimg.classList.add("hidden");
  document.querySelector(`.player-${active}`).classList.remove("player-winner");
  currScore = 0;
  active = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  activeScore[0] = 0;
  activeScore[1] = 0;
  playing = true;

  player0.classList.add("player-active");
  player1.classList.remove("player-active");
};
btnNew.addEventListener("click", reset);
document.querySelector(".continue").addEventListener("click", function () {
  reset();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
const removeClass = function (x) {
  if (x) {
    let fragment = document.createDocumentFragment();
    while (x.firstChild) {
      fragment.appendChild(x.firstChild);
    }
    x.parentNode.replaceChild(fragment, x);
  }
};
if (window.matchMedia("(min-width: 320px)").matches) {
  removeClass(document.querySelector(".box1"));
  removeClass(document.querySelector(".box1"));
}
