
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar navigation active state
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveLink() {
    let currentSection = "overview";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 160) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // Smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Copy color codes when clicked
  const colorItems = document.querySelectorAll(
    ".color-card, .color-swatch, [data-color]"
  );

  colorItems.forEach((item) => {
    item.addEventListener("click", async () => {
      const colorCode =
        item.getAttribute("data-color") ||
        item.querySelector(".color-hex")?.textContent?.trim() ||
        item.querySelector(".color-code")?.textContent?.trim();

      if (!colorCode) return;

      try {
        await navigator.clipboard.writeText(colorCode);

        const originalText = item.getAttribute("aria-label");
        item.setAttribute("aria-label", "Copied!");

        setTimeout(() => {
          if (originalText) {
            item.setAttribute("aria-label", originalText);
          } else {
            item.removeAttribute("aria-label");
          }
        }, 1200);
      } catch (error) {
        console.warn("Could not copy color code:", error);
      }
    });
  });

  // Motion preview
  const motionButtons = document.querySelectorAll(
    ".motion-preview, [data-motion-preview]"
  );

  motionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.remove("motion-active");

      void button.offsetWidth;

      button.classList.add("motion-active");

      setTimeout(() => {
        button.classList.remove("motion-active");
      }, 700);
    });
  });

  // Mobile sidebar toggle (if menu button exists)
  const menuButton = document.querySelector(
    ".menu-toggle, .mobile-menu-button"
  );

  const sidebar = document.querySelector(".sidebar");

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-open");

      const isOpen = sidebar.classList.contains("sidebar-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }
});

