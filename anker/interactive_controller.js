const { Application, Controller } = window.Stimulus;

const app = Application.start();

// ========================
// HEADER CONTROLLER
// ========================
class HeaderController extends Controller {
  static targets = ["nav"];

  connect() {
    this._scrollHandler = this._onScroll.bind(this);
    window.addEventListener("scroll", this._scrollHandler, { passive: true });
  }

  disconnect() {
    window.removeEventListener("scroll", this._scrollHandler);
  }

  toggleMenu() {
    this.navTarget.classList.toggle("is-open");
  }

  _onScroll() {
    if (window.scrollY > 10) {
      this.element.style.boxShadow = "0 2px 24px rgba(0,0,0,0.1)";
    } else {
      this.element.style.boxShadow = "";
    }
  }
}

// ========================
// SLIDER CONTROLLER
// ========================
class SliderController extends Controller {
  static targets = ["wrapper", "dots"];
  static values = { autoPlay: Boolean };

  connect() {
    this._current = 0;
    this._total = this.wrapperTarget.children.length;
    this._timer = null;

    if (this.autoPlayValue) {
      this._startAutoPlay();
    }

    this._addSwipe();
  }

  disconnect() {
    this._stopAutoPlay();
  }

  next() {
    this.goToIndex((this._current + 1) % this._total);
  }

  prev() {
    this.goToIndex((this._current - 1 + this._total) % this._total);
  }

  goTo(event) {
    const idx = parseInt(event.currentTarget.dataset.index, 10);
    this.goToIndex(idx);
    this._resetAutoPlay();
  }

  goToIndex(idx) {
    this._current = idx;
    this.wrapperTarget.style.transform = `translateX(-${idx * 100}%)`;
    this._updateDots();
  }

  _updateDots() {
    if (!this.hasDotsTarget) return;
    const dots = this.dotsTarget.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("dot--active", i === this._current);
    });
  }

  _startAutoPlay() {
    this._timer = setInterval(() => this.next(), 5000);
  }

  _stopAutoPlay() {
    if (this._timer) clearInterval(this._timer);
  }

  _resetAutoPlay() {
    this._stopAutoPlay();
    if (this.autoPlayValue) this._startAutoPlay();
  }

  _addSwipe() {
    let startX = 0;
    this.element.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    this.element.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
        this._resetAutoPlay();
      }
    }, { passive: true });
  }
}

// ========================
// CAROUSEL CONTROLLER
// ========================
class CarouselController extends Controller {
  static targets = ["track"];

  connect() {
    this._cardWidth = 0;
    this._gap = 16;
  }

  next() {
    const card = this.trackTarget.querySelector(".category-card");
    if (!card) return;
    const step = card.offsetWidth + this._gap;
    this.trackTarget.scrollLeft += step * 2;
  }

  prev() {
    const card = this.trackTarget.querySelector(".category-card");
    if (!card) return;
    const step = card.offsetWidth + this._gap;
    this.trackTarget.scrollLeft -= step * 2;
  }
}

// ========================
// TABS CONTROLLER
// ========================
class TabsController extends Controller {
  static targets = ["btn", "panel"];

  show(event) {
    const panel = event.currentTarget.dataset.panel;

    this.btnTargets.forEach((btn) => {
      btn.classList.toggle("tab-btn--active", btn.dataset.panel === panel);
    });

    this.panelTargets.forEach((p) => {
      const isActive = p.dataset.panel === panel;
      p.classList.toggle("tab-panel--active", isActive);
    });
  }
}

// ========================
// TESTIMONIALS CONTROLLER
// ========================
class TestimonialsController extends Controller {
  static targets = ["track"];

  connect() {
    this._offset = 0;
    this._cardWidth = 0;
    this._gap = 20;
    this._maxOffset = 0;

    requestAnimationFrame(() => this._measure());
    this._resizeHandler = this._measure.bind(this);
    window.addEventListener("resize", this._resizeHandler, { passive: true });
  }

  disconnect() {
    window.removeEventListener("resize", this._resizeHandler);
  }

  _measure() {
    const card = this.trackTarget.querySelector(".testimonial-card");
    if (!card) return;
    this._cardWidth = card.offsetWidth + this._gap;
    const total = this.trackTarget.querySelectorAll(".testimonial-card").length;
    const visible = Math.floor(this.trackTarget.offsetWidth / this._cardWidth);
    this._maxOffset = Math.max(0, (total - visible) * this._cardWidth);
  }

  next() {
    this._offset = Math.min(this._offset + this._cardWidth, this._maxOffset);
    this._apply();
  }

  prev() {
    this._offset = Math.max(this._offset - this._cardWidth, 0);
    this._apply();
  }

  _apply() {
    this.trackTarget.style.transform = `translateX(-${this._offset}px)`;
    this.trackTarget.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }
}

// ========================
// ANNOUNCEMENT CONTROLLER
// ========================
class AnnouncementController extends Controller {
  static targets = ["track"];

  connect() {
    this.element.addEventListener("mouseenter", () => {
      this.trackTarget.style.animationPlayState = "paused";
    });
    this.element.addEventListener("mouseleave", () => {
      this.trackTarget.style.animationPlayState = "running";
    });
  }
}

// ========================
// NEWSLETTER CONTROLLER
// ========================
class NewsletterController extends Controller {
  submit(event) {
    event.preventDefault();
    const input = this.element.querySelector(".newsletter-input");
    const btn = this.element.querySelector(".newsletter-submit");

    if (!input.value) return;

    btn.textContent = "Subscribed!";
    btn.style.background = "#22c55e";
    input.value = "";
    input.placeholder = "You're in! Check your inbox.";

    setTimeout(() => {
      btn.textContent = "Subscribe";
      btn.style.background = "";
      input.placeholder = "Enter your email address";
    }, 4000);
  }
}

// ========================
// DEALS CONTROLLER (Hot Deals strip)
// ========================
class DealsController extends Controller {
  static targets = ["track"];

  connect() {
    this._gap = 16;
  }

  next() {
    const card = this.trackTarget.querySelector(".deal-card");
    if (!card) return;
    this.trackTarget.scrollLeft += (card.offsetWidth + this._gap) * 2;
  }

  prev() {
    const card = this.trackTarget.querySelector(".deal-card");
    if (!card) return;
    this.trackTarget.scrollLeft -= (card.offsetWidth + this._gap) * 2;
  }
}

// Register all controllers
app.register("header", HeaderController);
app.register("slider", SliderController);
app.register("carousel", CarouselController);
app.register("tabs", TabsController);
app.register("testimonials", TestimonialsController);
app.register("announcement", AnnouncementController);
app.register("newsletter", NewsletterController);
app.register("deals", DealsController);
