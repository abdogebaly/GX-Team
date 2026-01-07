// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Add visible class styles dynamically
const style = document.createElement('style');
style.textContent = `
    section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===================================
// ANIMATE ELEMENTS ON SCROLL
// ===================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .tech-item, .stat-item, .contact-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation states
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .tech-item, .stat-item, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Initial check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// ===================================
// TECH STACK HOVER EFFECT
// ===================================
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// FEATURE CATEGORIES TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const featureCategories = document.querySelectorAll('.feature-category');

    featureCategories.forEach(category => {
        const header = category.querySelector('.category-header');

        if (header) {
            header.addEventListener('click', () => {
                category.classList.toggle('collapsed');
            });
        }
    });
});

// ===================================
// PROJECT CARDS STAGGER ANIMATION
// ===================================
const projectCards = document.querySelectorAll('.project-card');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    staggerObserver.observe(card);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
        // Show success message (in a real app, this would send to a backend)
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);

        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ===================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ===================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// TYPING EFFECT FOR HERO (Optional Enhancement)
// ===================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.style.opacity = '1'; // Ensure it's visible
}

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// SMOOTH REVEAL FOR STATS NUMBERS
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumbers = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;

            // Only animate if it contains a number
            if (text.match(/\d+/)) {
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(/\d+/, '');
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }

            observer.unobserve(target);
        }
    });
};

const numberObserver = new IntersectionObserver(animateNumbers, { threshold: 0.5 });

statNumbers.forEach(stat => {
    numberObserver.observe(stat);
});

// ===================================
// CURSOR GLOW EFFECT (Optional Enhancement)
// ===================================
let cursorGlow = null;

const createCursorGlow = () => {
    cursorGlow = document.createElement('div');
    cursorGlow.style.position = 'fixed';
    cursorGlow.style.width = '300px';
    cursorGlow.style.height = '300px';
    cursorGlow.style.borderRadius = '50%';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)';
    cursorGlow.style.pointerEvents = 'none';
    cursorGlow.style.transform = 'translate(-50%, -50%)';
    cursorGlow.style.transition = 'opacity 0.3s ease';
    cursorGlow.style.opacity = '0';
    cursorGlow.style.zIndex = '9999';
    document.body.appendChild(cursorGlow);
};

// Only create cursor glow on desktop
if (window.innerWidth > 968) {
    createCursorGlow();

    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', () => {
        if (cursorGlow) {
            cursorGlow.style.opacity = '0';
        }
    });
}

// ===================================
// FEATURED PROJECT PULSE ANIMATION
// ===================================
const botIcon = document.querySelector('.bot-icon');

if (botIcon) {
    setInterval(() => {
        botIcon.style.transform = 'scale(1.05)';
        setTimeout(() => {
            botIcon.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// ===================================
// LAZY LOADING OPTIMIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// PREVENT SCROLL JANK
// ===================================
let ticking = false;
let lastScrollY = window.scrollY;

const handleScroll = () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            // All scroll-based animations are handled here
            ticking = false;
        });

        ticking = true;
    }
};

window.addEventListener('scroll', handleScroll, { passive: true });

// ===================================
// PROGRESS BAR ANIMATIONS
// ===================================
const animateProgressBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            const counters = entry.target.querySelectorAll('.counter');

            progressBars.forEach(bar => {
                const target = parseInt(bar.getAttribute('data-target'));
                setTimeout(() => {
                    bar.style.width = target + '%';
                    bar.classList.add('animated');
                }, 200);
            });

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, 0, target, 1500);
            });

            observer.unobserve(entry.target);
        }
    });
};

const animateCounter = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const progressObserver = new IntersectionObserver(animateProgressBars, { threshold: 0.3 });

const growthSection = document.querySelector('.server-growth');
if (growthSection) {
    progressObserver.observe(growthSection);
}

// ===================================
// COMMAND SEARCH FUNCTIONALITY
// ===================================
// ACCURATE GXBOT COMMANDS DATABASE - 66+ Commands
const commandDatabase = [
    // General Commands (7)
    { name: 'vote', category: 'General', description: 'Vote for GXBot on Top.gg' },
    { name: 'server', category: 'General', description: 'Display server statistics and features' },
    { name: 'verify', category: 'General', description: 'Submit account verification request' },
    { name: 'invites_bot', category: 'General', description: 'Bot information and invite links' },
    { name: 'gxhup', category: 'General', description: 'Global GXHub network across servers' },
    { name: 'owner_bot', category: 'General', description: 'Bot owner information' },
    { name: 'lnformation', category: 'General', description: 'Display user information inside the server' },

    // Member Management & Moderation (10)
    { name: 'warn', category: 'Moderation', description: 'Warn a member' },
    { name: 'warnings', category: 'Moderation', description: 'View member warnings' },
    { name: 'remove_warnings', category: 'Moderation', description: 'Remove a warning' },
    { name: 'ban', category: 'Moderation', description: 'Ban a member' },
    { name: 'kick', category: 'Moderation', description: 'Kick a member' },
    { name: 'mute', category: 'Moderation', description: 'Mute a member' },
    { name: 'timeout', category: 'Moderation', description: 'Timeout a member' },
    { name: 'role', category: 'Moderation', description: 'Add or remove a role' },
    { name: 'give_role', category: 'Moderation', description: 'Give a role to all members' },
    { name: 'remove_role', category: 'Moderation', description: 'Remove a role from all members' },

    // Channel & Room Control (9)
    { name: 'lock', category: 'Channel Control', description: 'Lock the current channel' },
    { name: 'unlock', category: 'Channel Control', description: 'Unlock the channel' },
    { name: 'clear', category: 'Channel Control', description: 'Clear messages' },
    { name: 'remove_one', category: 'Channel Control', description: 'Remove a single channel or role' },
    { name: 'block_room', category: 'Channel Control', description: 'Block bot commands in a room' },
    { name: 'Hide_rooms', category: 'Channel Control', description: 'Hide all channels' },
    { name: 'Show_rooms', category: 'Channel Control', description: 'Show channels' },
    { name: 'allow_links', category: 'Channel Control', description: 'Allow links' },
    { name: 'block_links', category: 'Channel Control', description: 'Block links' },

    // Advanced Configuration & Automation (17)
    { name: 'log', category: 'Automation', description: 'Enable logging system' },
    { name: 'stop_log', category: 'Automation', description: 'Disable logs' },
    { name: 'log_deleted', category: 'Automation', description: 'Log deleted messages' },
    { name: 'invite_logs', category: 'Automation', description: 'Track invites' },
    { name: 'registration_panel', category: 'Automation', description: 'Admin registration panel' },
    { name: 'general_reply', category: 'Automation', description: 'Set automatic replies in a channel' },
    { name: 'remove_invites', category: 'Automation', description: 'Reset invites' },
    { name: 'setup_welcome', category: 'Automation', description: 'Welcome system setup' },
    { name: 'setup_suggestions', category: 'Automation', description: 'Suggestions channel setup' },
    { name: 'suggest', category: 'Automation', description: 'Submit a suggestion' },
    { name: 'aliases', category: 'Automation', description: 'Create command aliases' },
    { name: 'show_aliases', category: 'Automation', description: 'Show aliases' },
    { name: 'remove_aliases', category: 'Automation', description: 'Remove aliases' },
    { name: 'auto_reply', category: 'Automation', description: 'Add auto reply' },
    { name: 'list_replys', category: 'Automation', description: 'List active auto replies' },
    { name: 'auto_reply_remove', category: 'Automation', description: 'Remove auto reply' },
    { name: 'setup_ratings', category: 'Automation', description: 'Enable or disable rating system' },
    { name: 'setup_teckit', category: 'Automation', description: 'Setup ticket system' },
    { name: 'ticket_points', category: 'Automation', description: 'Display ticket points' },

    // Economy System (10)
    { name: 'bank', category: 'Economy', description: 'View bank card' },
    { name: 'profile', category: 'Economy', description: 'View user profile' },
    { name: 'top_kentos', category: 'Economy', description: 'Top users by currency' },
    { name: 'create_coupon', category: 'Economy', description: 'Create a coupon' },
    { name: 'use_coupon', category: 'Economy', description: 'Use a coupon' },
    { name: 'trust', category: 'Economy', description: 'Give trust every 24 hours' },
    { name: 'background_view', category: 'Economy', description: 'Browse backgrounds' },
    { name: 'view_my_backgrounds', category: 'Economy', description: 'View owned backgrounds' },
    { name: 'top_servers', category: 'Economy', description: 'Top servers leaderboard' },
    { name: 'top_tasks', category: 'Economy', description: 'Top tasks leaderboard' },

    // Entertainment (4)
    { name: 'gx_wheel', category: 'Entertainment', description: 'GX luck wheel' },
    { name: 'gx_wheel_channel', category: 'Entertainment', description: 'Set wheel channels' },
    { name: 'opinion', category: 'Entertainment', description: 'Random judgment or opinion' },
    { name: 'avatar_member', category: 'Entertainment', description: 'Display member avatar' },

    // Additional Utilities (9)
    { name: 'adhkar', category: 'Utilities', description: 'Play Islamic adhkar' },
    { name: 'stop_adhkar', category: 'Utilities', description: 'Stop adhkar' },
    { name: 'used_for', category: 'Utilities', description: 'Display bot usage statistics' },
    { name: 'embed', category: 'Utilities', description: 'Send embed messages' },
    { name: 'room_emojis', category: 'Utilities', description: 'Convert images to emojis in a channel' },
    { name: 'stop_room_emoji', category: 'Utilities', description: 'Stop emoji conversion' },
    { name: 'auto_reply_emoji', category: 'Utilities', description: 'Auto emoji reactions' },
    { name: 'stopped_reply_emoji', category: 'Utilities', description: 'Disable emoji replies' },
    { name: 'tax', category: 'Utilities', description: 'Set tax calculation channel' }
];

// Calculate accurate statistics from command database
const commandStats = {
    general: commandDatabase.filter(cmd => cmd.category === 'General').length,
    moderation: commandDatabase.filter(cmd => cmd.category === 'Moderation').length,
    channelControl: commandDatabase.filter(cmd => cmd.category === 'Channel Control').length,
    automation: commandDatabase.filter(cmd => cmd.category === 'Automation').length,
    economy: commandDatabase.filter(cmd => cmd.category === 'Economy').length,
    entertainment: commandDatabase.filter(cmd => cmd.category === 'Entertainment').length,
    utilities: commandDatabase.filter(cmd => cmd.category === 'Utilities').length,
    total: commandDatabase.length
};

console.log('GXBot Command Statistics:', commandStats);

const searchInput = document.getElementById('command-search-input');
const searchResults = document.getElementById('search-results');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            searchResults.innerHTML = '';
            return;
        }

        const filteredCommands = commandDatabase.filter(cmd =>
            cmd.name.toLowerCase().includes(query) ||
            cmd.category.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query)
        );

        displaySearchResults(filteredCommands, query);
    });
}

function displaySearchResults(commands, query) {
    if (commands.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <h3>No commands found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
        return;
    }

    const resultsHTML = commands.map(cmd => `
        <div class="command-card">
            <div class="command-header">
                <span class="command-name">/${cmd.name}</span>
                <span class="command-category">${cmd.category}</span>
            </div>
            <p class="command-description">${cmd.description}</p>
        </div>
    `).join('');

    searchResults.innerHTML = resultsHTML;
}

// ===================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ===================================
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-projects': 'Projects',
        'nav-tech': 'Tech Stack',
        'nav-contact': 'Contact',

        // Hero Section
        'hero-building': 'Building the',
        'hero-future': 'Future',
        'hero-of-software': 'of Software',
        'hero-subtitle': 'We are a passionate programming team dedicated to crafting innovative solutions that solve real-world problems',
        'hero-btn-work': 'View Our Work',
        'hero-btn-contact': 'Get In Touch',

        // About Section
        'about-title': 'About Us',
        'about-heading': 'Who We Are',
        'about-desc1': 'We are GX Team, a dedicated group of software developers passionate about creating cutting-edge solutions that make a real impact. Our expertise spans across web development, bot creation, automation, and full-stack applications.',
        'about-desc2': 'With a focus on clean code, modern design, and user experience, we transform ideas into powerful digital products. Whether it\'s building Discord bots, developing web applications, or creating custom tools, we approach every project with innovation and precision.',
        'about-stat1': 'Projects Completed',
        'about-stat2': 'Technologies Mastered',
        'about-stat3': 'Commitment',

        // Featured Project
        'featured-title': 'Featured Project',
        'featured-badge': 'Featured',
        'featured-desc': 'GXBot is an advanced Discord bot designed to provide full server management, moderation, automation, economy systems, and interactive features across multiple servers.',
        'featured-capabilities': 'Bot Capabilities',

        // Growth Section
        'growth-title': 'How GXBot Improves Your Server',
        'growth-subtitle': 'Measurable impact on your Discord community',
        'growth-moderation': 'Moderation Efficiency',
        'growth-engagement': 'Member Engagement',
        'growth-activity': 'Server Activity',
        'growth-increase': 'increase',

        // Power Section
        'power-title': 'GXBot Command Power',
        'power-subtitle': '66+ commands across 6 comprehensive categories',
        'power-general': 'General Commands',
        'power-general-desc': 'Server info, verification & bot details',
        'power-moderation': 'Moderation Commands',
        'power-moderation-desc': 'Warnings, bans, kicks & role management',
        'power-channel': 'Channel Control',
        'power-channel-desc': 'Lock, clear, hide & manage channels',
        'power-automation': 'Automation & Config',
        'power-automation-desc': 'Logging, welcome, tickets & auto-replies',
        'power-economy': 'Economy System',
        'power-economy-desc': 'Bank, profiles, coupons & leaderboards',
        'power-fun': 'Fun & Utilities',
        'power-fun-desc': 'Games, adhkar, embeds & emoji tools',

        // Search Section
        'search-title': 'Find a GXBot Command',
        'search-subtitle': 'Search through all available commands',
        'search-placeholder': 'Search by command name, category, or description...',

        // Projects Section
        'projects-title': 'Our Projects',
        'projects-subtitle': 'Explore our portfolio of innovative solutions',

        // Tech Stack Section
        'tech-title': 'Our Tech Stack',
        'tech-subtitle': 'Technologies we use to build amazing products',

        // Contact Section
        'contact-title': 'Get In Touch',
        'contact-subtitle': 'Let\'s work together on your next project'
    },
    ar: {
        // Navigation
        'nav-home': 'الرئيسية',
        'nav-about': 'من نحن',
        'nav-projects': 'المشاريع',
        'nav-tech': 'التقنيات',
        'nav-contact': 'اتصل بنا',

        // Hero Section
        'hero-building': 'نبني',
        'hero-future': 'مستقبل',
        'hero-of-software': 'البرمجيات',
        'hero-subtitle': 'نحن فريق برمجة شغوف مكرس لصياغة حلول مبتكرة تحل المشاكل الحقيقية',
        'hero-btn-work': 'شاهد أعمالنا',
        'hero-btn-contact': 'تواصل معنا',

        // About Section
        'about-title': 'من نحن',
        'about-heading': 'من نكون',
        'about-desc1': 'نحن فريق GX، مجموعة متفانية من مطوري البرمجيات الشغوفين بإنشاء حلول متطورة تحدث تأثيرًا حقيقيًا. تمتد خبرتنا عبر تطوير الويب وإنشاء البوتات والأتمتة وتطبيقات Full-Stack.',
        'about-desc2': 'مع التركيز على الكود النظيف والتصميم الحديث وتجربة المستخدم، نحول الأفكار إلى منتجات رقمية قوية. سواء كان بناء بوتات Discord أو تطوير تطبيقات الويب أو إنشاء أدوات مخصصة، نتعامل مع كل مشروع بالابتكار والدقة.',
        'about-stat1': 'مشروع مكتمل',
        'about-stat2': 'تقنية متقنة',
        'about-stat3': 'التزام',

        // Featured Project
        'featured-title': 'المشروع المميز',
        'featured-badge': 'مميز',
        'featured-desc': 'GXBot هو بوت Discord متقدم مصمم لتوفير إدارة كاملة للسيرفر والإشراف والأتمتة وأنظمة الاقتصاد والميزات التفاعلية عبر خوادم متعددة.',
        'featured-capabilities': 'قدرات البوت',

        // Growth Section
        'growth-title': 'كيف يحسن GXBot سيرفرك',
        'growth-subtitle': 'تأثير قابل للقياس على مجتمع Discord الخاص بك',
        'growth-moderation': 'كفاءة الإشراف',
        'growth-engagement': 'تفاعل الأعضاء',
        'growth-activity': 'نشاط السيرفر',
        'growth-increase': 'زيادة',

        // Power Section
        'power-title': 'قوة أوامر GXBot',
        'power-subtitle': '66+ أمر عبر 6 فئات شاملة',
        'power-general': 'الأوامر العامة',
        'power-general-desc': 'معلومات السيرفر والتحقق وتفاصيل البوت',
        'power-moderation': 'أوامر الإشراف',
        'power-moderation-desc': 'التحذيرات والحظر والطرد وإدارة الأدوار',
        'power-channel': 'التحكم بالقنوات',
        'power-channel-desc': 'قفل ومسح وإخفاء وإدارة القنوات',
        'power-automation': 'الأتمتة والإعدادات',
        'power-automation-desc': 'السجلات والترحيب والتذاكر والردود التلقائية',
        'power-economy': 'نظام الاقتصاد',
        'power-economy-desc': 'البنك والملفات والكوبونات ولوحات الصدارة',
        'power-fun': 'المرح والأدوات',
        'power-fun-desc': 'الألعاب والأذكار والرسائل المدمجة وأدوات الإيموجي',

        // Search Section
        'search-title': 'ابحث عن أمر GXBot',
        'search-subtitle': 'ابحث في جميع الأوامر المتاحة',
        'search-placeholder': 'ابحث باسم الأمر أو الفئة أو الوصف...',

        // Projects Section
        'projects-title': 'مشاريعنا',
        'projects-subtitle': 'استكشف مجموعة حلولنا المبتكرة',

        // Tech Stack Section
        'tech-title': 'مجموعة التقنيات',
        'tech-subtitle': 'التقنيات التي نستخدمها لبناء منتجات رائعة',

        // Contact Section
        'contact-title': 'تواصل معنا',
        'contact-subtitle': 'لنعمل معًا على مشروعك القادم'
    }
};

let currentLang = 'en';

const langToggle = document.getElementById('lang-toggle');
const langOptions = document.querySelectorAll('.lang-option');

if (langToggle) {
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;

    // Update active state
    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    // Toggle RTL
    if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholder
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// ===================================
// CONSOLE MESSAGE (Easter Egg)
// ===================================
console.log('%c👋 Welcome to GX Team Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for talented developers? Check out our work!', 'color: #8b5cf6; font-size: 14px;');
console.log('%cInterested in the code? Visit our GitHub!', 'color: #a1a1aa; font-size: 12px;');
