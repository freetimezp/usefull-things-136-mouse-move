window.onload = function () {
    const items = document.querySelectorAll(".item");
    const container = document.querySelector(".container");
    const spans = document.querySelectorAll(".hero-copy span");

    const numberOfItems = items.length;
    const angleIncrement = (2 * Math.PI) / numberOfItems;

    const radius = 300;
    let currentAngle = 0;
    let isMouseOverSpan = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const basePath = "./assets/images/";

    items.forEach((item, index) => {
        let img = document.createElement("img");
        img.src = basePath + "img-" + (index + 1) + ".jpg";
        img.alt = "Image " + (index + 1);
        item.appendChild(img);
    });

    const updateGallery = (mouseX, mouseY, show = true) => {
        targetX = mouseX - container.getBoundingClientRect().left;
        targetY = mouseY - container.getBoundingClientRect().top;

        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        items.forEach(function (item, index) {
            const angle = currentAngle + index * angleIncrement;
            const x = currentX + radius * Math.cos(angle) - item.offsetWidth / 2;
            const y = currentY + radius * Math.sin(angle) - item.offsetHeight / 2;

            gsap.to(item, {
                x: x,
                y: y,
                opacity: show ? 1 : 0,
                duration: 0.5,
                ease: "power1.out",
            });
        });
    };

    spans.forEach((span) => {
        span.addEventListener("mouseenter", (e) => {
            isMouseOverSpan = true;
            updateGallery(e.clientX, e.clientY, true);
        });

        span.addEventListener("mousemove", (e) => {
            if (isMouseOverSpan) {
                targetX = e.clientX - 1000;
                targetY = e.clientY - 450;
            }
        });

        span.addEventListener("mouseleave", () => {
            isMouseOverSpan = false;
            updateGallery(0, 0, false);
        });
    });

    gsap.ticker.add(() => {
        currentAngle += 0.005;

        if (currentAngle > 2 * Math.PI) {
            currentAngle -= 2 * Math.PI;
        }

        if (isMouseOverSpan) {
            updateGallery(targetX, targetY, true);
        }
    });

    document.querySelectorAll(".hero-copy span").forEach((span) => {
        span.addEventListener("mouseenter", () => {
            span.parentNode.style.color = "#545454";
        });

        span.addEventListener("mouseleave", () => {
            span.parentNode.style.color = "#fff";
        });
    });
};
