class CVEditor {
    constructor() {
        this.cvData = this.loadCVData();
        this.initElements();
        this.initEventListeners();
        this.renderCV();
    }

    initElements() {
        // Botones principales
        this.editBtn = document.getElementById('edit-cv');
        this.uploadBtn = document.getElementById('upload-cv');
        this.downloadBtn = document.getElementById('download-cv');
        this.fileInput = document.getElementById('cv-file-input');
        this.profileImgInput = document.getElementById('profile-img-input');
        this.changePhotoBtn = document.querySelector('.change-photo-btn');
        
        // Paneles
        this.cvEditorPanel = document.getElementById('cv-editor-panel');
        
        // Botones del editor
        this.saveBtn = document.getElementById('save-cv');
        this.cancelBtn = document.getElementById('cancel-edit');
        
        // Contenedores
        this.expContainer = document.getElementById('edit-experience-container');
        this.eduContainer = document.getElementById('edit-education-container');
        this.skillsContainer = document.getElementById('edit-skills-container');
        
        // Botones para agregar items
        this.addExpBtn = document.getElementById('add-experience');
        this.addEduBtn = document.getElementById('add-education');
        this.addSkillBtn = document.getElementById('add-skill');
    }

    initEventListeners() {
        // Botones principales
        this.editBtn.addEventListener('click', () => this.toggleEditor());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.downloadBtn.addEventListener('click', () => this.downloadCV());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.changePhotoBtn.addEventListener('click', () => this.profileImgInput.click());
        this.profileImgInput.addEventListener('change', (e) => this.handleProfileImageChange(e));
        
        // Botones del editor
        this.saveBtn.addEventListener('click', () => this.saveCV());
        this.cancelBtn.addEventListener('click', () => this.toggleEditor());
        
        // Botones para agregar items
        this.addExpBtn.addEventListener('click', () => this.addExperience());
        this.addEduBtn.addEventListener('click', () => this.addEducation());
        this.addSkillBtn.addEventListener('click', () => this.addSkill());
        
        // Eliminar items
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                this.removeItem(e.target);
            }
        });
    }

    loadCVData() {
        const defaultCV = {
            name: 'Tu Nombre',
            title: 'Tu Profesión',
            about: 'Breve descripción sobre ti, tus habilidades y objetivos profesionales.',
            email: 'tu@email.com',
            phone: '+123 456 7890',
            location: 'Tu Ciudad, País',
            website: 'tusitio.com',
            profileImage: 'assets/images/profile.jpg',
            experiences: [
                {
                    position: 'Nombre del Puesto',
                    company: 'Empresa',
                    startDate: 'Fecha de inicio',
                    endDate: 'Fecha de fin',
                    description: 'Descripción de responsabilidades y logros.'
                }
            ],
            education: [
                {
                    degree: 'Título Académico',
                    institution: 'Institución',
                    startDate: 'Fecha de inicio',
                    endDate: 'Fecha de fin'
                }
            ],
            skills: [
                { name: 'JavaScript', level: 80 },
                { name: 'HTML/CSS', level: 90 },
                { name: 'React', level: 75 }
            ],
            certifications: [
                {
                    name: 'Nombre de la Certificación',
                    institution: 'Institución',
                    date: 'Fecha de obtención'
                }
            ]
        };

        return JSON.parse(localStorage.getItem('cvData')) || defaultCV;
    }

    saveToLocalStorage() {
        localStorage.setItem('cvData', JSON.stringify(this.cvData));
    }

    renderCV() {
        // Información básica
        document.getElementById('cv-name').textContent = this.cvData.name;
        document.getElementById('cv-title').textContent = this.cvData.title;
        document.getElementById('cv-about').textContent = this.cvData.about;
        document.getElementById('cv-email').textContent = this.cvData.email;
        document.getElementById('cv-phone').textContent = this.cvData.phone;
        document.getElementById('cv-location').textContent = this.cvData.location;
        document.getElementById('cv-website').textContent = this.cvData.website;
        
        // Foto de perfil
        document.getElementById('cv-profile-img').src = this.cvData.profileImage;
        
        // Experiencias
        this.renderSection('cv-experience', this.cvData.experiences, (exp) => `
            <h4>${exp.position}</h4>
            <h5>${exp.company}</h5>
            <div class="cv-date">${exp.startDate} - ${exp.endDate}</div>
            <p>${exp.description}</p>
        `);
        
        // Educación
        this.renderSection('cv-education', this.cvData.education, (edu) => `
            <h4>${edu.degree}</h4>
            <h5>${edu.institution}</h5>
            <div class="cv-date">${edu.startDate} - ${edu.endDate}</div>
        `);
        
        // Habilidades
        this.renderSection('cv-skills', this.cvData.skills, (skill) => `
            <span class="skill-name">${skill.name}</span>
            <div class="skill-bar">
                <div class="skill-level" style="width: ${skill.level}%;"></div>
            </div>
        `);
        
        // Certificaciones
        this.renderSection('cv-certifications', this.cvData.certifications, (cert) => `
            <h4>${cert.name}</h4>
            <h5>${cert.institution}</h5>
            <div class="cv-date">${cert.date}</div>
        `);
    }

    renderSection(containerId, items, template) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = containerId.split('-')[1] + '-item';
            div.innerHTML = template(item);
            container.appendChild(div);
        });
    }

    loadEditForm() {
        // Información básica
        document.getElementById('edit-name').value = this.cvData.name;
        document.getElementById('edit-title').value = this.cvData.title;
        document.getElementById('edit-about').value = this.cvData.about;
        document.getElementById('edit-email').value = this.cvData.email;
        document.getElementById('edit-phone').value = this.cvData.phone;
        document.getElementById('edit-location').value = this.cvData.location;
        document.getElementById('edit-website').value = this.cvData.website;
        
        // Experiencias
        this.loadEditItems(this.expContainer, this.cvData.experiences, (exp, index) => `
            <button class="remove-item" data-index="${index}" data-type="experience">&times;</button>
            <div class="form-group">
                <label for="edit-exp-position-${index}">Puesto</label>
                <input type="text" id="edit-exp-position-${index}" value="${exp.position}">
            </div>
            <div class="form-group">
                <label for="edit-exp-company-${index}">Empresa</label>
                <input type="text" id="edit-exp-company-${index}" value="${exp.company}">
            </div>
            <div class="form-group">
                <label for="edit-exp-start-${index}">Fecha de inicio</label>
                <input type="text" id="edit-exp-start-${index}" value="${exp.startDate}">
            </div>
            <div class="form-group">
                <label for="edit-exp-end-${index}">Fecha de fin</label>
                <input type="text" id="edit-exp-end-${index}" value="${exp.endDate}">
            </div>
            <div class="form-group">
                <label for="edit-exp-desc-${index}">Descripción</label>
                <textarea id="edit-exp-desc-${index}" rows="3">${exp.description}</textarea>
            </div>
        `);
        
        // Educación
        this.loadEditItems(this.eduContainer, this.cvData.education, (edu, index) => `
            <button class="remove-item" data-index="${index}" data-type="education">&times;</button>
            <div class="form-group">
                <label for="edit-edu-degree-${index}">Título</label>
                <input type="text" id="edit-edu-degree-${index}" value="${edu.degree}">
            </div>
            <div class="form-group">
                <label for="edit-edu-institution-${index}">Institución</label>
                <input type="text" id="edit-edu-institution-${index}" value="${edu.institution}">
            </div>
            <div class="form-group">
                <label for="edit-edu-start-${index}">Fecha de inicio</label>
                <input type="text" id="edit-edu-start-${index}" value="${edu.startDate}">
            </div>
            <div class="form-group">
                <label for="edit-edu-end-${index}">Fecha de fin</label>
                <input type="text" id="edit-edu-end-${index}" value="${edu.endDate}">
            </div>
        `);
        
        // Habilidades
        this.loadEditItems(this.skillsContainer, this.cvData.skills, (skill, index) => `
            <button class="remove-item" data-index="${index}" data-type="skill">&times;</button>
            <div class="form-group">
                <label for="edit-skill-name-${index}">Nombre de la habilidad</label>
                <input type="text" id="edit-skill-name-${index}" value="${skill.name}">
            </div>
            <div class="form-group">
                <label for="edit-skill-level-${index}">Nivel (0-100)</label>
                <input type="number" id="edit-skill-level-${index}" min="0" max="100" value="${skill.level}">
            </div>
        `);
    }

    loadEditItems(container, items, template) {
        container.innerHTML = '';
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'editable-item';
            div.innerHTML = template(item, index);
            container.appendChild(div);
        });
    }

    toggleEditor() {
        if (this.cvEditorPanel.style.display === 'block') {
            this.cvEditorPanel.style.display = 'none';
            this.editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar CV';
        } else {
            this.loadEditForm();
            this.cvEditorPanel.style.display = 'block';
            this.editBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
        }
    }

    saveCV() {
        // Obtener datos básicos
        this.cvData = {
            name: document.getElementById('edit-name').value,
            title: document.getElementById('edit-title').value,
            about: document.getElementById('edit-about').value,
            email: document.getElementById('edit-email').value,
            phone: document.getElementById('edit-phone').value,
            location: document.getElementById('edit-location').value,
            website: document.getElementById('edit-website').value,
            profileImage: this.cvData.profileImage,
            experiences: this.getExperiences(),
            education: this.getEducation(),
            skills: this.getSkills(),
            certifications: this.cvData.certifications
        };

        this.saveToLocalStorage();
        this.renderCV();
        this.toggleEditor();
        showNotification('CV actualizado correctamente', 'success');
    }

    getExperiences() {
        const experiences = [];
        document.querySelectorAll('#edit-experience-container .editable-item').forEach((item, index) => {
            experiences.push({
                position: document.getElementById(`edit-exp-position-${index}`).value,
                company: document.getElementById(`edit-exp-company-${index}`).value,
                startDate: document.getElementById(`edit-exp-start-${index}`).value,
                endDate: document.getElementById(`edit-exp-end-${index}`).value,
                description: document.getElementById(`edit-exp-desc-${index}`).value
            });
        });
        return experiences;
    }

    getEducation() {
        const education = [];
        document.querySelectorAll('#edit-education-container .editable-item').forEach((item, index) => {
            education.push({
                degree: document.getElementById(`edit-edu-degree-${index}`).value,
                institution: document.getElementById(`edit-edu-institution-${index}`).value,
                startDate: document.getElementById(`edit-edu-start-${index}`).value,
                endDate: document.getElementById(`edit-edu-end-${index}`).value
            });
        });
        return education;
    }

    getSkills() {
        const skills = [];
        document.querySelectorAll('#edit-skills-container .editable-item').forEach((item, index) => {
            skills.push({
                name: document.getElementById(`edit-skill-name-${index}`).value,
                level: parseInt(document.getElementById(`edit-skill-level-${index}`).value)
            });
        });
        return skills;
    }

    addExperience() {
        const newIndex = this.expContainer.children.length;
        const div = document.createElement('div');
        div.className = 'editable-item';
        div.innerHTML = `
            <button class="remove-item" data-index="${newIndex}" data-type="experience">&times;</button>
            <div class="form-group">
                <label for="edit-exp-position-${newIndex}">Puesto</label>
                <input type="text" id="edit-exp-position-${newIndex}" placeholder="Ej: Desarrollador Frontend">
            </div>
            <div class="form-group">
                <label for="edit-exp-company-${newIndex}">Empresa</label>
                <input type="text" id="edit-exp-company-${newIndex}" placeholder="Nombre de la empresa">
            </div>
            <div class="form-group">
                <label for="edit-exp-start-${newIndex}">Fecha de inicio</label>
                <input type="text" id="edit-exp-start-${newIndex}" placeholder="Ej: Enero 2020">
            </div>
            <div class="form-group">
                <label for="edit-exp-end-${newIndex}">Fecha de fin</label>
                <input type="text" id="edit-exp-end-${newIndex}" placeholder="Ej: Actualidad">
            </div>
            <div class="form-group">
                <label for="edit-exp-desc-${newIndex}">Descripción</label>
                <textarea id="edit-exp-desc-${newIndex}" rows="3" placeholder="Describe tus responsabilidades y logros"></textarea>
            </div>
        `;
        this.expContainer.appendChild(div);
    }

    addEducation() {
        const newIndex = this.eduContainer.children.length;
        const div = document.createElement('div');
        div.className = 'editable-item';
        div.innerHTML = `
            <button class="remove-item" data-index="${newIndex}" data-type="education">&times;</button>
            <div class="form-group">
                <label for="edit-edu-degree-${newIndex}">Título</label>
                <input type="text" id="edit-edu-degree-${newIndex}" placeholder="Ej: Licenciatura en Informática">
            </div>
            <div class="form-group">
                <label for="edit-edu-institution-${newIndex}">Institución</label>
                <input type="text" id="edit-edu-institution-${newIndex}" placeholder="Nombre de la institución">
            </div>
            <div class="form-group">
                <label for="edit-edu-start-${newIndex}">Fecha de inicio</label>
                <input type="text" id="edit-edu-start-${newIndex}" placeholder="Ej: Septiembre 2016">
            </div>
            <div class="form-group">
                <label for="edit-edu-end-${newIndex}">Fecha de fin</label>
                <input type="text" id="edit-edu-end-${newIndex}" placeholder="Ej: Junio 2020">
            </div>
        `;
        this.eduContainer.appendChild(div);
    }

    addSkill() {
        const newIndex = this.skillsContainer.children.length;
        const div = document.createElement('div');
        div.className = 'editable-item';
        div.innerHTML = `
            <button class="remove-item" data-index="${newIndex}" data-type="skill">&times;</button>
            <div class="form-group">
                <label for="edit-skill-name-${newIndex}">Nombre de la habilidad</label>
                <input type="text" id="edit-skill-name-${newIndex}" placeholder="Ej: JavaScript">
            </div>
            <div class="form-group">
                <label for="edit-skill-level-${newIndex}">Nivel (0-100)</label>
                <input type="number" id="edit-skill-level-${newIndex}" min="0" max="100" value="70" placeholder="0-100">
            </div>
        `;
        this.skillsContainer.appendChild(div);
    }

    removeItem(button) {
        const index = button.getAttribute('data-index');
        const type = button.getAttribute('data-type');
        const container = document.getElementById(`edit-${type}-container`);
        
        button.parentElement.remove();
        
        // Reindexar los elementos restantes
        const items = container.querySelectorAll('.editable-item');
        items.forEach((item, newIndex) => {
            const removeBtn = item.querySelector('.remove-item');
            removeBtn.setAttribute('data-index', newIndex);
            
            // Actualizar los IDs de los inputs
            const inputs = item.querySelectorAll('input, textarea, label');
            inputs.forEach(input => {
                const oldId = input.id || input.getAttribute('for');
                if (oldId) {
                    const newId = oldId.replace(/\d+/, newIndex);
                    if (input.id) input.id = newId;
                    if (input.getAttribute('for')) input.setAttribute('for', newId);
                }
            });
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const validTypes = [
            'application/pdf', 
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (validTypes.includes(file.type)) {
            showNotification('CV subido correctamente', 'success');
            // Aquí podrías agregar lógica para procesar el archivo
        } else {
            showNotification('Formato de archivo no soportado', 'error');
        }
    }

    handleProfileImageChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.cvData.profileImage = e.target.result;
                document.getElementById('cv-profile-img').src = e.target.result;
                this.saveToLocalStorage();
                showNotification('Foto de perfil actualizada', 'success');
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('Formato de imagen no válido', 'error');
        }
    }

    downloadCV() {
        showNotification('Preparando descarga del CV en PDF...', 'warning');
        
        // Simulación de descarga (en un caso real, usarías una librería como jsPDF o harías una petición al servidor)
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'assets/pdfs/cv.pdf';
            link.download = `CV_${this.cvData.name.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1500);
    }
}

// Inicializar el editor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CVEditor();
});