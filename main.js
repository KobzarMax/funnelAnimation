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
  "./asset/man_single.svg",
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
  "./asset/headphone_guy.svg",
  "./asset/boy.svg",
  "./asset/guy.svg",
];

function rerunAnimation(iconsList, container) {
  let animationCount = 0;
  const originalIcons = iconsList.querySelectorAll("img");
  const iconsLength = container.querySelectorAll(".icons");
  if (iconsLength.length > 3) {
    iconsLength[1].remove();
  }
  originalIcons.forEach((icon) => {
    icon.addEventListener("animationend", function () {
      animationCount++;
      if (animationCount === originalIcons.length - 2) {
        duplicateIcons(iconsList, container);
      }
    });
  });
}

function runAnimationOnce(fistBlock, container) {
  const images = fistBlock.querySelectorAll("img");
  images.forEach(function (img, index) {
    img.style.animation = `fall2 ${index % 2 === 0 ? 7 : 9}s`;
    img.style.animationDelay = index * 3.2 + "s";
    img.style.animationFillMode = "forwards";
  });

  rerunAnimation(fistBlock, container);
}

function duplicateIcons(block, container) {
  const clonedIcons = block.cloneNode(true);

  const clonedImages = clonedIcons.querySelectorAll("img");
  clonedImages.forEach(function (img, index) {
    img.style.animation = `fall2 ${index % 2 === 0 ? 7 : 9}s`;
    img.style.animationDelay = index * 3.2 + "s";
    img.style.animationFillMode = "forwards";
  });

  container.appendChild(clonedIcons);
  rerunAnimation(clonedIcons, container);
  const randomImage = clonedIcons.querySelector(".randomImage");

  if (randomImage) {
    const randomIndex = Math.floor(Math.random() * imagesToRandom.length);
    randomImage.src = imagesToRandom[randomIndex];
  }
}

// const funnelItemWrappers = document.querySelectorAll(".funnel-item-wrapper");
// funnelItemWrappers.forEach((wrapper) => {
//   const iconsContainer = wrapper.querySelector(".icons-container");
//   const icons = iconsContainer && iconsContainer.querySelector(".icons");
//   if (iconsContainer && icons) {
//     runAnimationOnce(icons, iconsContainer);
//   }
// });

// const salesItemsContainers = document.querySelectorAll(".sales-item");
//
// salesItemsContainers.forEach((item, index) => {
//   const salesItem = item.querySelector("img");
//   runSalesAnimation(salesItem, item, index);
// });
//
// function runSalesAnimation(image, imageWrapper, index) {
//   image.style.animation = `fall 9s`;
//   image.style.animationDelay = index * 9 + "s";
//   image.style.animationFillMode = "forwards";
//
//   rerunSalesAnimation(image, imageWrapper, index);
// }

const imageContainers = document.querySelectorAll('.funnel-image-container');
const firstFunnel = document.querySelector('#firstFunnel');
const secondFunnel = document.querySelector('#secondFunnel');
const thirdFunnel = document.querySelector('#thirdFunnel');
const calendar = document.querySelector('#calendar');
const screenWidth = window.screen.width;
const main = document.querySelector('.ai-animation');
const topToFirstFunnel = main.scrollHeight - firstFunnel.offsetTop - firstFunnel.scrollHeight / 2;
const topToSecondFunnel = main.scrollHeight - (secondFunnel.scrollTop - secondFunnel.scrollHeight / 2);
const topToThirdFunnel = main.scrollHeight - (thirdFunnel.scrollTop - thirdFunnel.scrollHeight / 2);
const topToCalendar = main.scrollHeight - (calendar.scrollTop - calendar.scrollHeight / 2);
console.log(firstFunnel.getBoundingClientRect().top)

// document.addEventListener('scroll', () => {
//   console.log(document.documentElement.scrollTop)
// });

imageContainers.forEach((container, index) => {
  if (screenWidth > 1200) {
    if (index === 0 || index === 1 || index === 2) {
      container.style.setProperty(
          "--screenMiddle",
          `calc(${30 - index * 10}vw)`
      );
    } else {
      container.style.setProperty(
          "--screenMiddle",
          `calc(${20 - index * 10}vw)`
      );
    }
  } else {
    if (index === 0 || index === 2 || index === 4) {
      container.style.setProperty("--screenMiddle", `calc(${index * 10}vw)`);
    } else {
      container.style.setProperty(
          "--screenMiddle",
          `calc(${10 - index * 10}vw)`
      );
    }
  }

  runSalesAnimation(container, index)
})

function runSalesAnimation(container, index) {
  const original = container.querySelector('.funnel-image-inner');

  container.style.animation = `funnelStart 30s`;
  container.style.animationDelay = index * 15 + "s";
  container.style.animationFillMode = "forwards";

  setTimeout(() => {
    const first = original.querySelector('.first-funnel-icon');
    const second = original.querySelector('.second-funnel-icon');
    first.style.opacity = '0';
    second.style.opacity = '1';

  }, 10000)

  container.addEventListener('animationend', () => {
    rerunSalesAnimation(original, container, index);
  })

}


function rerunSalesAnimation(original, container, index) {
  const iconsLength = container.querySelectorAll("img");
  if (iconsLength.length > 3) {
    iconsLength[1].remove();
  }

  original.addEventListener("animationend", function () {
    duplicateSalesIcon(original, container, index);
  });
}

function duplicateSalesIcon(icon, container, index) {
  const clonedIcon = icon.cloneNode(true);

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
