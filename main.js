const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("viewed");
    }
  });
};
const observer = new IntersectionObserver(callback, {
  threshold: [0.2],
});

const aiTitle = document.querySelector(".ai-title");
const aiSubtitle = document.querySelector(".ai-subtitle");
const salesWrapper = document.querySelector(".sales-wrapper");
const funnelItems = document.querySelectorAll(".funnel-item-wrapper");

if (aiTitle) {
  observer.observe(aiTitle);
}
if (aiSubtitle) {
  observer.observe(aiSubtitle);
}
if (salesWrapper) {
  observer.observe(salesWrapper);
}
if (funnelItems) {
  funnelItems.forEach((item) => {
    observer.observe(item);
  });
}

const imagesToRandom = [
  "./asset/man_small.svg",
  "./asset/girl_small.svg",
  "./asset/granny_small.svg",
  "./asset/headphone_small.svg",
  "./asset/boy_small.svg",
  "./asset/guy_small.svg",
];

const imagesWithIconToRandom = [
  "./asset/man.svg",
  "./asset/girl.svg",
  "./asset/granny.svg",
  "./asset/headphone.svg",
  "./asset/boy.svg",
  "./asset/guy.svg",
];

const imageContainers = document.querySelectorAll('.funnel-image-container');
const firstFunnel = document.querySelector('#firstFunnel');
const secondFunnel = document.querySelector('#secondFunnel');
const thirdFunnel = document.querySelector('#thirdFunnel');
const calendar = document.querySelector('#calendar');
const screenWidth = window.screen.width;
const main = document.querySelector('.ai-animation');
const salesWrapperSection = document.querySelector('.sales-wrapper');
const extraHeight = main.scrollHeight - salesWrapperSection.scrollHeight;

const topToFirstFunnel = firstFunnel.getBoundingClientRect().top - extraHeight;
const topToSecondFunnel = secondFunnel.getBoundingClientRect().top - extraHeight;
const topToThirdFunnel = thirdFunnel.getBoundingClientRect().top - extraHeight;
const topToCalendar = calendar.getBoundingClientRect().top - extraHeight;
console.log(topToFirstFunnel, topToSecondFunnel, topToThirdFunnel, topToCalendar);

imageContainers.forEach((container, index) => {
  const animated = container.querySelector(".funnel-image-inner");

  if (screenWidth > 1200) {
    if (index === 0 || index === 1) {
      animated.style.setProperty(
          "--screenMiddle",
          `calc(35vw - ${index * 10}vw)`
      );
    } else if (index === 2 || index === 3) {
      animated.style.setProperty(
          "--screenMiddle",
          `calc(25vw - ${index * 10}vw)`
      );
    } else {
      animated.style.setProperty(
          "--screenMiddle",
          `calc(15vw - ${index * 10}vw)`
      );
    }
  } else {
    if (index === 0 || index === 2 || index === 4) {
      animated.style.setProperty("--screenMiddle", `calc(${index * 10}vw)`);
    } else {
      animated.style.setProperty(
          "--screenMiddle",
          `calc(${10 - index * 10}vw)`
      );
    }
  }
  animated.style.setProperty(
      "--fallLength",
      `${topToFirstFunnel.toFixed(2)}px`
  );
  animated.style.setProperty(
      "--fall2Length",
      `${topToSecondFunnel.toFixed(2)}px`
  );
  animated.style.setProperty(
      "--fall3Length",
      `${topToThirdFunnel.toFixed(2)}px`
  );
  animated.style.setProperty(
      "--fall4Length",
      `${topToCalendar.toFixed(2)}px`
  );

  runSalesAnimation(container, animated, index)
})

function runSalesAnimation(container, animated, index) {

  animated.style.animation = `funnelStart 3s`;
  animated.style.animationDelay = index * 5 + "s";
  animated.style.animationFillMode = "forwards";


  animated.addEventListener('animationend', (event) => {
    rerunSalesAnimation(container, animated, event, index);
  })

}

const getAnimationName = (current) => {
  switch (current) {
    case 'funnelStart':
      return 'funnelSecond'
    case 'funnelSecond':
      return 'funnelThird'
    case 'funnelThird':
      return 'funnelCalendar'
    case 'funnelCalendar':
        return 'funnelStart'
  }
}

const getNewIcon = (animation) => {
  switch (animation) {
    case 'funnelStart':
      return 1
    case 'funnelSecond':
      return 2
    case 'funnelThird':
      return 2
    case 'funnelCalendar':
      return 0
  }
}

function rerunSalesAnimation( container, currentAnimated, event ) {

  const nextAnimation = getAnimationName(event.animationName);
  const nextIcon = getNewIcon(event.animationName);
  const images = currentAnimated.querySelectorAll('img');
  images[nextIcon].style.opacity = '1';
  images[nextIcon].style.transitionDuration = '0.3s';
  if (nextIcon === 0) {
    images[2].style.opacity = '0';
    images[2].style.transitionDuration = '0.3s';
  } else {
    images[nextIcon].previousElementSibling.style.opacity = '0';
    images[nextIcon].previousElementSibling.style.transitionDuration = '0.3s';
  }
  currentAnimated.style.animation = `${nextAnimation} 3s`;
  currentAnimated.style.animationFillMode = "forwards";

}

function duplicateSalesIcon(container, currentAnimated, index) {
  const clonedIcon = currentAnimated.cloneNode(true);

  clonedIcon.style.animation = `fall 9s`;
  clonedIcon.style.animationDelay = index * 9 + "s";
  clonedIcon.style.animationFillMode = "forwards";

  container.appendChild(clonedIcon);
  rerunSalesAnimation(clonedIcon, container, index);
}

const counts = document.querySelectorAll(".count-value");
const percents = document.querySelectorAll(".percent");

counts.forEach((count, index) => {
  let value = Number(count.innerHTML);
  setInterval(
    () => {
      count.innerHTML = ++value;
    },
    index === 0 ? 600 : index === 1 ? 1000 : 300
  );
});

const intervals = [];

percents.forEach((percent) => {
  let value = Number(percent.innerHTML);
  let intervalId = setInterval(() => {
    if (value < 100) {
      percent.innerHTML = ++value;
    }
    if (value >= 100) {
      clearInterval(intervalId);
    }
  }, 2000);

  intervals.push(intervalId);
});
