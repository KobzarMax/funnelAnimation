const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("viewed");
        }
    });
};
const observer = new IntersectionObserver(callback, {
    threshold: [0.2]
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
    })
}

function rerunAnimation(iconsList, container) {
    let animationCount = 0;
    const originalIcons = iconsList.querySelectorAll('img');
    const iconsLength = container.querySelectorAll('.icons');
    if (iconsLength.length > 3) {
        iconsLength[1].remove();
    }
    originalIcons.forEach((icon) => {
        icon.addEventListener('animationend', function() {
            animationCount++;
            if (animationCount === originalIcons.length - 2) {
                duplicateIcons(iconsList, container);
            }
        });
    });
}

function runAnimationOnce(fistBlock, container) {
    const images = fistBlock.querySelectorAll('img');
    images.forEach(function(img, index) {
        img.style.animation = `fall2 ${index % 2 === 0 ? 1 : 2}s`;
        img.style.animationDelay = index * 0.3 + 's';
        img.style.animationFillMode = 'forwards';
    });

    rerunAnimation(fistBlock, container);
}

function duplicateIcons(block, container) {
    const clonedIcons = block.cloneNode(true);

    const clonedImages = clonedIcons.querySelectorAll('img');
    clonedImages.forEach(function(img, index) {
        img.style.animation = `fall2 ${index % 2 === 0 ? 1 : 2}s`;
        img.style.animationDelay = index * 0.3 + 's';
        img.style.animationFillMode = 'forwards';
    });

    container.appendChild(clonedIcons);
    rerunAnimation(clonedIcons, container);
}

const funnelItemWrappers = document.querySelectorAll('.funnel-item-wrapper');
funnelItemWrappers.forEach((wrapper) => {
    const iconsContainer = wrapper.querySelector('.icons-container');
    const icons = iconsContainer && iconsContainer.querySelector('.icons');
    if (iconsContainer && icons) {
        runAnimationOnce(icons, iconsContainer);
    }
});

const salesItemsContainers = document.querySelectorAll('.sales-item');
const screenWidth = window.screen.width;

salesItemsContainers.forEach((item, index) => {
    const salesItem = item.querySelector('img');
    if (screenWidth > 1200) {
        if (index === 0 || index === 1 || index === 2) {
            salesItem.style.setProperty('--screenMiddle', `calc(${30 - index * 10}vw)`);
            salesItem.style.animationDelay = index * 0.3 + 's';
        } else {
            salesItem.style.setProperty('--screenMiddle', `calc(${20 - index * 10}vw)`);
            salesItem.style.animationDelay = index * 0.3 + 's';
        }
    } else {
        if (index === 0 || index === 2 || index === 4) {
            salesItem.style.setProperty('--screenMiddle', `calc(${index * 10}vw)`);
            salesItem.style.animationDelay = index * 0.3 + 's';
        } else {
            salesItem.style.setProperty('--screenMiddle', `calc(${10 - index * 10}vw)`);
            salesItem.style.animationDelay = index * 0.3 + 's';
        }
    }


    runSalesAnimation(salesItem, item, index )
});

function runSalesAnimation (image, imageWrapper, index) {

    image.style.animation = `fall ${index % 2 === 0 ? 3 : 4}s`;
    image.style.animationDelay = index * 0.3 + 's';
    image.style.animationFillMode = 'forwards';

    rerunSalesAnimation(image, imageWrapper, index);
}

function rerunSalesAnimation(originalIcon, container, index) {
    const iconsLength = container.querySelectorAll('img');
    if (iconsLength.length > 3) {
        iconsLength[1].remove();
    }
    originalIcon.addEventListener('animationend', function() {
            duplicateSalesIcon(originalIcon, container, index);
    });
}

function duplicateSalesIcon (icon, container, index) {
    const clonedIcon = icon.cloneNode(true);

    clonedIcon.style.animation = `fall ${index % 2 === 0 ? 3 : 4}s`;
    clonedIcon.style.animationDelay = index * 0.3 + 's';
    clonedIcon.style.animationFillMode = 'forwards';

    container.appendChild(clonedIcon);
    rerunSalesAnimation(clonedIcon, container, index);
}