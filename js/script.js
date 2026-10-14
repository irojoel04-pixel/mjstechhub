console.log("Irogbanyo-John Ayebatonbara Joel website loaded.");

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".section-heading, .service-card, .project-card, .writing-card, " +
        ".writing-item, .contact-card, .about-preview, .contact-project-content, " +
        ".capability, .info-box, .paper, .archive-card, .archive-toolbar-inner"
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion && "IntersectionObserver" in window) {
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
        revealElements.forEach((element) => element.classList.add("visible"));
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
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });
        navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
        document.addEventListener("click", (event) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
        });
        document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
    }

    // Keep the active navigation state correct when a page is opened directly.
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach((link) => {
        const target = (link.getAttribute("href") || "").split("/").pop().split("#")[0].toLowerCase();
        if (target && target === currentPage) link.classList.add("active");
    });

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
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    const projectImages = document.querySelectorAll(".project-image.real-image img, .real-image img");
    const imageViewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");
    const imageViewerClose = document.getElementById("imageViewerClose");

    const closeImageViewer = () => {
        if (!imageViewer) return;
        imageViewer.classList.remove("active");
        imageViewer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const openImageViewer = (image) => {
        if (!imageViewer || !viewerImage) return;
        viewerImage.src = image.currentSrc || image.src;
        viewerImage.alt = image.alt || "Project image";
        imageViewer.classList.add("active");
        document.body.style.overflow = "hidden";
        if (imageViewerClose) imageViewerClose.focus();
    };

    if (projectImages.length && imageViewer && viewerImage) {
        projectImages.forEach((image) => {
            image.style.cursor = "zoom-in";
            image.setAttribute("tabindex", "0");
            image.setAttribute("role", "button");
            image.addEventListener("click", () => openImageViewer(image));
            image.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openImageViewer(image);
                }
            });
        });
    }

    if (imageViewerClose) imageViewerClose.addEventListener("click", closeImageViewer);
    if (imageViewer) {
        imageViewer.addEventListener("click", (event) => {
            if (event.target === imageViewer) closeImageViewer();
        });
    }
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeImageViewer();
    });

    // Archive hero background rotation
    const archiveHero = document.querySelector(".archive-hero");
    if (archiveHero && !reduceMotion) {
        let archiveBackgroundIndex = 0;
        window.setInterval(() => {
            archiveBackgroundIndex = archiveBackgroundIndex === 0 ? 1 : 0;
            archiveHero.classList.toggle("show-second-bg", archiveBackgroundIndex === 1);
        }, 7000);
    }

    // Archive video controls
    const archiveVideos = document.querySelectorAll(".archive-video");
    archiveVideos.forEach((video) => {
        video.addEventListener("play", () => {
            archiveVideos.forEach((otherVideo) => {
                if (otherVideo !== video) otherVideo.pause();
            });
        });
    });

    // Archive projects and videos
    const archiveGrid = document.querySelector(".archive-grid");
    const archiveFilters = document.querySelectorAll(".archive-filter");
    const archiveEmpty = document.querySelector(".archive-empty");

    const archiveProjects = [
        {
            title: "Solar Dryer",
            category: "cad",
            type: "CAD / Mechanical Design",
            video: "videos/solar-dryer.mp4",
            description: "A documented solar dryer design project, showing the design process and practical engineering work behind the project.",
            meta: ["CAD", "Mechanical Design"]
        },
        {
            title: "Motorized Screw Jack",
            category: "cad",
            type: "CAD / Mechanical Design",
            video: "videos/motorized-screw-jack.mp4",
            description: "A mechanical CAD project documenting the model, mechanism and design development process.",
            meta: ["Fusion 360", "Machine Design"]
        },
        {
            title: "Cannon Project",
            category: "cad",
            type: "CAD Project",
            video: "videos/cannon-project.mp4",
            description: "A documented CAD project from my modelling and design practice.",
            meta: ["CAD", "Design Practice"]
        },
        {
            title: "Laptop Stand",
            category: "cad",
            type: "CAD Design",
            video: "videos/laptop-stand.mp4",
            description: "A CAD design created as part of my modelling practice and design challenge.",
            meta: ["CAD", "Design Challenge"]
        }
    ];

    const createArchiveCard = (project, index) => {
        const card = document.createElement("article");
        card.className = "archive-card";
        if (index === 0) card.classList.add("archive-card-featured");
        card.dataset.archiveCategory = project.category;

        const media = document.createElement("div");
        media.className = "archive-media";

        const video = document.createElement("video");
        video.className = "archive-video";
        video.preload = "metadata";
        video.playsInline = true;
        video.controls = true;
        video.setAttribute("aria-label", `${project.title} project video`);

        const source = document.createElement("source");
        source.src = project.video;
        source.type = "video/mp4";
        video.appendChild(source);

        const label = document.createElement("span");
        label.className = "archive-media-label";
        label.textContent = `${project.category.toUpperCase()} / ${String(index + 1).padStart(2, "0")}`;

        media.append(video, label);

        const body = document.createElement("div");
        body.className = "archive-card-body";

        const type = document.createElement("span");
        type.className = "archive-type";
        type.textContent = project.type;

        const title = document.createElement("h2");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const meta = document.createElement("div");
        meta.className = "archive-meta";
        project.meta.forEach((item) => {
            const tag = document.createElement("span");
            tag.textContent = item;
            meta.appendChild(tag);
        });

        body.append(type, title, description, meta);
        card.append(media, body);

        video.addEventListener("play", () => {
            document.querySelectorAll(".archive-video").forEach((otherVideo) => {
                if (otherVideo !== video) otherVideo.pause();
            });
        });

        video.addEventListener("error", () => {
            video.setAttribute("aria-label", `${project.title} video could not be loaded`);
        });

        return card;
    };

    if (archiveGrid) {
        archiveGrid.innerHTML = "";
        archiveProjects.forEach((project, index) => {
            archiveGrid.appendChild(createArchiveCard(project, index));
        });
    }

    const archiveCards = document.querySelectorAll(".archive-card");

    if (archiveFilters.length && archiveCards.length) {
        const applyArchiveFilter = (filter) => {
            let visibleCount = 0;
            archiveFilters.forEach((button) => {
                button.classList.toggle("active", button.dataset.filter === filter);
            });
            archiveCards.forEach((card) => {
                const category = card.dataset.archiveCategory || "";
                const visible = filter === "all" || category === filter;
                card.hidden = !visible;
                if (visible) visibleCount += 1;
            });
            if (archiveEmpty) archiveEmpty.hidden = visibleCount !== 0;
        };
        archiveFilters.forEach((button) => {
            button.addEventListener("click", () => applyArchiveFilter(button.dataset.filter || "all"));
        });
    }

});
