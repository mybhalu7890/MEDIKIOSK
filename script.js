/* =====================================================
   MEDIKIOSK
   FRONTEND DEMO ENGINE
===================================================== */

let patientStep = 1;
let interviewQuestion = 0;
let ocrCompleted = false;


/* =====================================================
   PARTICLES
===================================================== */

const particleContainer =
    document.getElementById("particles");

for (let i = 0; i < 45; i++) {

    const particle =
        document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        8 + Math.random() * 15 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particleContainer.appendChild(particle);
}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(page) {

    const home =
        document.getElementById("homePage");

    const patient =
        document.getElementById("patientPage");

    const doctor =
        document.getElementById("doctorPage");

    home.style.display = "none";

    patient.style.display = "none";

    doctor.style.display = "none";

    if (page === "home") {

        home.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    if (page === "patient") {

        patient.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    if (page === "doctor") {

        doctor.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        animateCounters();
    }
}


/* =====================================================
   SCROLL
===================================================== */

function scrollToSection(id) {

    showPage("home");

    setTimeout(() => {

        const element =
            document.getElementById(id);

        if (element) {

            element.scrollIntoView({
                behavior: "smooth"
            });

        }

    }, 100);
}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const nav =
        document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {

        nav.style.display = "";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";

        nav.style.top = "70px";

        nav.style.left = "0";

        nav.style.right = "0";

        nav.style.padding = "20px";

        nav.style.flexDirection = "column";

        nav.style.background = "#08192a";

        nav.style.borderRadius = "15px";
    }
}


/* =====================================================
   PATIENT FLOW
===================================================== */

function nextPatientStep() {

    const current =
        document.querySelector(
            `.patient-step[data-step="${patientStep}"]`
        );

    if (!validatePatientStep()) {
        return;
    }

    current.classList.remove("active");

    patientStep++;

    if (patientStep > 8) {
        patientStep = 8;
    }

    const next =
        document.querySelector(
            `.patient-step[data-step="${patientStep}"]`
        );

    next.classList.add("active");

    updatePatientProgress();

    if (patientStep === 7) {

        const name =
            document.getElementById("patientName").value;

        document.getElementById("summaryName")
            .textContent =
            name || "Demo Patient 01";
    }
}


function validatePatientStep() {

    if (patientStep !== 1) {
        return true;
    }

    const name =
        document.getElementById("patientName").value.trim();

    const age =
        document.getElementById("patientAge").value;

    if (!name || !age) {

        showToast(
            "Missing Information",
            "Please enter your name and age.",
            "!"
        );

        return false;
    }

    return true;
}


function updatePatientProgress() {

    const percent =
        Math.round((patientStep / 8) * 100);

    document.getElementById(
        "patientProgress"
    ).style.width = percent + "%";

    document.getElementById(
        "patientProgressText"
    ).textContent = percent + "%";

    document.getElementById(
        "patientStepText"
    ).textContent =
        `Step ${patientStep} of 8`;
}


/* =====================================================
   LANGUAGE
===================================================== */

function selectLanguage(button) {

    document.querySelectorAll(
        ".language-grid button"
    ).forEach(btn => {

        btn.classList.remove("selected");

    });

    button.classList.add("selected");

    showToast(
        "Language Selected",
        button.textContent +
        " selected for patient interaction.",
        "✓"
    );
}


/* =====================================================
   AI INTERVIEW
===================================================== */

const questions = [

    "What brings you to the doctor today?",

    "Where exactly do you feel the discomfort?",

    "When did this problem begin?",

    "Is it constant or does it come and go?",

    "Have you noticed any other symptoms?",

    "Are you currently taking any medicines?",

    "Do you have any known allergies?",

    "Have you had any previous medical conditions or procedures?"

];


function sendChat() {

    const input =
        document.getElementById("chatInput");

    const value =
        input.value.trim();

    if (!value) {

        showToast(
            "Enter Response",
            "Please type an answer first.",
            "!"
        );

        return;
    }

    addMessage(
        value,
        "user"
    );

    input.value = "";

    showToast(
        "AI Processing",
        "Analyzing your response...",
        "🧠"
    );

    setTimeout(() => {

        interviewQuestion++;

        if (
            interviewQuestion <
            questions.length
        ) {

            addMessage(
                questions[interviewQuestion],
                "ai"
            );

        } else {

            addMessage(
                "Thank you. I have collected the available history for this demo.",
                "ai"
            );

            updateHistoryProgress(100);
        }

        updateHistoryProgress(
            Math.min(
                20 +
                interviewQuestion * 10,
                100
            )
        );

    }, 800);
}


function addMessage(text, type) {

    const chat =
        document.getElementById("chatBox");

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;

    message.innerHTML = `

        <span>
            ${type === "ai" ? "AI" : "YOU"}
        </span>

        ${text}

    `;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;
}


function simulateVoice() {

    const mic =
        document.getElementById("micButton");

    const status =
        document.getElementById("voiceStatus");

    mic.classList.add("recording");

    status.textContent =
        "Listening...";

    setTimeout(() => {

        status.textContent =
            "Processing audio...";

    }, 1200);

    setTimeout(() => {

        status.textContent =
            "Transcribing...";

    }, 2200);

    setTimeout(() => {

        mic.classList.remove("recording");

        status.textContent =
            "Transcription complete";

        const input =
            document.getElementById("chatInput");

        input.value =
            "Mujhe pichle kuch dino se headache ho raha hai.";

        addMessage(
            "Mujhe pichle kuch dino se headache ho raha hai.",
            "user"
        );

        showToast(
            "Voice Transcribed",
            "Demo speech converted to text.",
            "🎙"
        );

    }, 3200);
}


function updateHistoryProgress(percent) {

    document.getElementById(
        "historyProgress"
    ).style.width = percent + "%";

    document.getElementById(
        "historyPercent"
    ).textContent =
        percent + "%";
}


/* =====================================================
   OCR
===================================================== */

function simulateOCR(input) {

    if (!input.files.length) {
        return;
    }

    const loading =
        document.getElementById("ocrLoading");

    const status =
        document.getElementById("ocrStatus");

    loading.classList.remove("hidden");

    const stages = [

        "SCANNING...",

        "DETECTING TEXT...",

        "EXTRACTING INFORMATION...",

        "ORGANIZING RECORD...",

        "OCR COMPLETE ✓"

    ];

    let index = 0;

    const interval =
        setInterval(() => {

            status.textContent =
                stages[index];

            index++;

            if (index >= stages.length) {

                clearInterval(interval);

                ocrCompleted = true;

                showToast(
                    "OCR Complete",
                    "Medical information extracted in demo mode.",
                    "✓"
                );

            }

        }, 800);
}


function showOCRResult() {

    if (!ocrCompleted) {

        showToast(
            "Upload Required",
            "Please upload a demo document first.",
            "!"
        );

        return;
    }

    nextPatientStep();
}


function editOCR() {

    showToast(
        "Edit Mode",
        "OCR fields can now be edited.",
        "✏"
    );
}


function confirmOCR() {

    showToast(
        "OCR Confirmed",
        "Extracted record marked for doctor verification.",
        "✓"
    );
}


function rejectOCR() {

    showToast(
        "OCR Rejected",
        "Extracted information was rejected.",
        "✕"
    );
}


/* =====================================================
   PATIENT SUBMISSION
===================================================== */

function notifyStaff() {

    showToast(
        "Hospital Staff Notified",
        "Priority review notification created in demo mode.",
        "⚠"
    );
}


function submitPatient() {

    showToast(
        "Sent to Doctor",
        "Patient record has been added to the doctor queue.",
        "✓"
    );

    setTimeout(() => {

        showPage("doctor");

    }, 1500);
}


/* =====================================================
   DOCTOR DASHBOARD
===================================================== */

function doctorView(view) {

    const title =
        document.getElementById(
            "dashboardTitle"
        );

    const titles = {

        dashboard:
            "Good evening, Doctor.",

        queue:
            "Patient Queue",

        patients:
            "Patients",

        summaries:
            "AI Clinical Summaries",

        alerts:
            "Priority Review Alerts",

        records:
            "Medical Records",

        ayush:
            "AYUSH Records",

        notes:
            "Clinical Notes",

        analytics:
            "Healthcare Analytics"
    };

    title.textContent =
        titles[view] ||
        "Doctor Dashboard";

    showToast(
        "Dashboard",
        titles[view],
        "✓"
    );
}


function animateCounters() {

    document.querySelectorAll(
        "[data-count]"
    ).forEach(counter => {

        const target =
            Number(counter.dataset.count);

        let value = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 30)
            );

        const timer =
            setInterval(() => {

                value += increment;

                if (value >= target) {

                    value = target;

                    clearInterval(timer);
                }

                counter.textContent =
                    value;

            }, 30);

    });
}


/* =====================================================
   SEARCH
===================================================== */

function searchPatients() {

    const query =
        document.getElementById(
            "patientSearch"
        ).value.toLowerCase();

    document.querySelectorAll(
        ".patient-row"
    ).forEach(row => {

        const name =
            row.dataset.name.toLowerCase();

        row.style.display =
            name.includes(query)
                ? "grid"
                : "none";
    });
}


/* =====================================================
   PATIENT PROFILE
===================================================== */

function openPatient() {

    document
        .getElementById("patientModal")
        .classList.add("show");
}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");
}


function profileTab(tab, button) {

    document.querySelectorAll(
        ".profile-tabs button"
    ).forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");

    if (tab === "timeline") {

        showToast(
            "Medical Timeline",
            "Chronological medical history loaded.",
            "🗓"
        );

    }

    if (tab === "summary") {

        showToast(
            "AI Summary",
            "Doctor-ready AI-assisted summary loaded.",
            "🧠"
        );

    }

    if (tab === "documents") {

        showToast(
            "Medical Records",
            "1 fictional document available.",
            "📄"
        );

    }

    if (tab === "ayush") {

        showAyush();

    }
}


/* =====================================================
   DOCTOR VERIFICATION
===================================================== */

function verifyAI() {

    showToast(
        "Information Verified",
        "Doctor verification recorded. Final clinical control remains with the doctor.",
        "✓"
    );

    document.querySelectorAll(
        ".verify-status"
    ).forEach(el => {

        el.textContent =
            "✓ VERIFIED BY DOCTOR";

        el.style.color =
            "var(--mint)";
    });
}


function editAI() {

    showToast(
        "Edit Mode",
        "Doctor can modify the AI-generated information.",
        "✏"
    );
}


function rejectAI() {

    showToast(
        "AI Information Rejected",
        "The AI-generated information has been marked as rejected.",
        "✕"
    );
}


function saveNotes() {

    showToast(
        "Clinical Notes Saved",
        "Doctor notes saved in demo mode.",
        "✓"
    );
}


/* =====================================================
   AYUSH
===================================================== */

function showAyush() {

    showToast(
        "AYUSH Mode",
        "Structured AYUSH fields ready: Prakriti, Vikriti, Agni, Koshta and more.",
        "🌿"
    );
}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function showNotifications() {

    showToast(
        "Notifications",
        "3 notifications: priority review, new patient, verification pending.",
        "🔔"
    );
}


/* =====================================================
   DEMO MODE
===================================================== */

function startDemo() {

    showPage("patient");

    patientStep = 1;

    document.querySelectorAll(
        ".patient-step"
    ).forEach(step => {

        step.classList.remove("active");

    });

    document
        .querySelector(
            '.patient-step[data-step="1"]'
        )
        .classList.add("active");

    updatePatientProgress();

    showToast(
        "Interactive Demo Started",
        "Experience the MediKiosk patient journey.",
        "▶"
    );
}


/* =====================================================
   PRESENTATION MODE
===================================================== */

const presentationSlides = [

    [
        "MEDIKIOSK",
        "AI-Powered Clinical History & Patient Intake"
    ],

    [
        "THE PROBLEM",
        "Hospitals face high patient loads and repetitive manual history-taking."
    ],

    [
        "THE SOLUTION",
        "Collect patient information before consultation."
    ],

    [
        "PATIENT JOURNEY",
        "Register → Consent → Language → Interview → OCR"
    ],

    [
        "AI INTERVIEW",
        "Adaptive questions organize the patient's story."
    ],

    [
        "OCR",
        "Old medical documents become structured digital information."
    ],

    [
        "AI SUMMARY",
        "Concise information prepared for doctor review."
    ],

    [
        "PRIORITY REVIEW",
        "Information requiring clinical review is highlighted."
    ],

    [
        "DOCTOR DASHBOARD",
        "Doctors review patients, summaries and alerts."
    ],

    [
        "VERIFICATION",
        "Confirm → Edit → Reject. Doctor remains in control."
    ],

    [
        "IMPACT",
        "Better Information → Better Decisions → Better Care"
    ]

];

let presentationIndex = 0;


function openPresentation() {

    document
        .getElementById("presentationMode")
        .classList.add("show");

    updatePresentation();
}


function closePresentation() {

    document
        .getElementById("presentationMode")
        .classList.remove("show");
}


function presentationNext() {

    if (
        presentationIndex <
        presentationSlides.length - 1
    ) {

        presentationIndex++;

        updatePresentation();
    }
}


function presentationPrev() {

    if (presentationIndex > 0) {

        presentationIndex--;

        updatePresentation();
    }
}


function updatePresentation() {

    const slide =
        presentationSlides[
            presentationIndex
        ];

    document.getElementById(
        "presentationTitle"
    ).textContent = slide[0];

    document.getElementById(
        "presentationText"
    ).textContent = slide[1];

    document.getElementById(
        "presentationCounter"
    ).textContent =
        `${presentationIndex + 1} / ${presentationSlides.length}`;

    document.getElementById(
        "presentationProgress"
    ).style.width =
        `${((presentationIndex + 1) /
        presentationSlides.length) * 100}%`;
}


/* =====================================================
   KEYBOARD PRESENTATION CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const presentation =
            document
                .getElementById(
                    "presentationMode"
                );

        if (!presentation.classList.contains("show")) {
            return;
        }

        if (event.key === "ArrowRight") {
            presentationNext();
        }

        if (event.key === "ArrowLeft") {
            presentationPrev();
        }

        if (event.key === "Escape") {
            closePresentation();
        }

    }
);


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(
    title,
    message,
    icon = "✓"
) {

    const toast =
        document.getElementById("toast");

    document.getElementById(
        "toastTitle"
    ).textContent = title;

    document.getElementById(
        "toastMessage"
    ).textContent = message;

    document.getElementById(
        "toastIcon"
    ).textContent = icon;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);
}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updatePatientProgress();

        /*
         * Prototype note:
         *
         * Real AI APIs should NOT be placed here.
         * Connect FastAPI endpoints later.
         *
         * Example:
         *
         * fetch("/api/interview/answer", {
         *     method: "POST",
         *     body: JSON.stringify(data)
         * });
         *
         */

    }
);
