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

const funnelItemWrappers = document.querySelectorAll(".funnel-item-wrapper");
funnelItemWrappers.forEach((wrapper) => {
  const iconsContainer = wrapper.querySelector(".icons-container");
  const icons = iconsContainer && iconsContainer.querySelector(".icons");
  if (iconsContainer && icons) {
    runAnimationOnce(icons, iconsContainer);
  }
});

const salesItemsContainers = document.querySelectorAll(".sales-item");
const screenWidth = window.screen.width;

salesItemsContainers.forEach((item, index) => {
  const salesItem = item.querySelector("img");
  if (screenWidth > 1200) {
    if (index === 0 || index === 1 || index === 2) {
      salesItem.style.setProperty(
        "--screenMiddle",
        `calc(${30 - index * 10}vw)`
      );
      salesItem.style.animationDelay = index * 0.5 + "s";
    } else {
      salesItem.style.setProperty(
        "--screenMiddle",
        `calc(${20 - index * 10}vw)`
      );
      salesItem.style.animationDelay = index * 0.5 + "s";
    }
  } else {
    if (index === 0 || index === 2 || index === 4) {
      salesItem.style.setProperty("--screenMiddle", `calc(${index * 10}vw)`);
      salesItem.style.animationDelay = index * 0.5 + "s";
    } else {
      salesItem.style.setProperty(
        "--screenMiddle",
        `calc(${10 - index * 10}vw)`
      );
      salesItem.style.animationDelay = index * 0.5 + "s";
    }
  }

  runSalesAnimation(salesItem, item, index);
});

function runSalesAnimation(image, imageWrapper, index) {
  image.style.animation = `fall ${index % 2 === 0 ? 7 : 9}s`;
  image.style.animationDelay = index * 3.3 + "s";
  image.style.animationFillMode = "forwards";

  rerunSalesAnimation(image, imageWrapper, index);
}

function rerunSalesAnimation(originalIcon, container, index) {
  const iconsLength = container.querySelectorAll("img");
  if (iconsLength.length > 3) {
    iconsLength[1].remove();
  }

  originalIcon.addEventListener("animationend", function () {
    duplicateSalesIcon(originalIcon, container, index);

    originalIcon.style.opacity = "0";
    const randomIndex = Math.floor(
      Math.random() * imagesWithIconToRandom.length
    );
    originalIcon.src = imagesWithIconToRandom[randomIndex];
    setTimeout(() => {
      originalIcon.style.opacity = "0.5";
    }, 500);
  });
}

function duplicateSalesIcon(icon, container, index) {
  const clonedIcon = icon.cloneNode(true);

  clonedIcon.style.animation = `fall ${index % 2 === 0 ? 7 : 9}s`;
  clonedIcon.style.animationDelay = index * 3.3 + "s";
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
