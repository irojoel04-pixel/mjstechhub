console.log("Irogbanyo-John Ayebatonbara Joel website loaded.");

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(
        ".section-heading, .service-card, .project-card, .writing-card, " +
        ".writing-item, .contact-card, .about-preview, .contact-project-content, " +
        ".capability, .info-box, .paper"
    );

    if ("IntersectionObserver" in window) {
        revealElements.forEach((element) => element.classList.add("reveal"));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("reveal", "visible"));
    }

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        };
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });
        navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
        document.addEventListener("click", (event) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
        });
        document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
    }

    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    const backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.type = "button";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.title = "Back to top";
    backToTop.innerHTML = "↑";
    document.body.appendChild(backToTop);

    const updateScrollUI = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
        progress.style.width = `${percent}%`;
        backToTop.classList.toggle("visible", scrollTop > 520);
    };
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    window.addEventListener("resize", updateScrollUI);
    updateScrollUI();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const projectImages = document.querySelectorAll(".project-image.real-image img, .real-image img");
    const imageViewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");
    const imageViewerClose = document.getElementById("imageViewerClose");

    const closeImageViewer = () => {
        if (!imageViewer) return;
        imageViewer.classList.remove("active");
        document.body.style.overflow = "";
    };
    const openImageViewer = (image) => {
        if (!imageViewer || !viewerImage) return;
        viewerImage.src = image.src;
        viewerImage.alt = image.alt || "Project image";
        imageViewer.classList.add("active");
        document.body.style.overflow = "hidden";
        if (imageViewerClose) imageViewerClose.focus();
    };
    if (projectImages.length && imageViewer && viewerImage) {
        projectImages.forEach((image) => {
            image.style.cursor = "zoom-in";
            image.addEventListener("click", () => openImageViewer(image));
        });
    }
    if (imageViewerClose) imageViewerClose.addEventListener("click", closeImageViewer);
    if (imageViewer) imageViewer.addEventListener("click", (event) => { if (event.target === imageViewer) closeImageViewer(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeImageViewer(); });
});
