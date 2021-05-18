const WAIT_TIME = 2000;
const LETTER_DURATION = 100;

const noop = () => {};

function onLoad() {
  const text = [

  "Dharven Doshi.",
    "a Java Programmer.",
    "an UX/UI Designer.",
    "a Full Stack Web Developer.",
    " an Android Application Developer.",

  ];

  loopAnimation(text.reverse());
}

function loopAnimation(text) {
  text.reduce(
    (result, data) => {
      const color = randomColor();
      const writeTxt = write("forward", data, color);
      const eraseTxt = write("backward", data, color);

      return writeTxt(wait(eraseTxt(result)));
    },
    () => loopAnimation(text)
  )();
}

const randomColor = () => {
  const colors = ["#F15156", "#08B2E3", "#FF7F11", "#629460"];

  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

const wait = (done) => () => {
  const timerId = setTimeout(run, WAIT_TIME);

  function run() {
    done();
    clearTimeout(timerId);
  }
};

const write = (direction, text, color) => (callback) => () => {
  const animatedText = document.querySelector(".animated_text");
  const underline = document.querySelector(".underline");
  animatedText.style.color = color;
  underline.style.background = color;

  let counter = direction === "forward" ? 0 : text.length - 1;

  const timerId = setInterval(run, LETTER_DURATION);

  function run() {
    animatedText.innerHTML = text.substring(0, counter);
    const doneForward = counter === text.length + 1;
    const doneBackward = counter === -1;

    if (doneForward || doneBackward) {
      clearInterval(timerId);
      callback();
    }

    counter = direction === "forward" ? counter + 1 : counter - 1;
  }
};

window.addEventListener("load", onLoad);
