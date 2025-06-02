class SebastianLabs {
    constructor() {
        this.currentModel = 'gpt-4o-mini';
        this.currentProvider = 'OpenAI';
        this.uploadedFiles = [];
        this.messageHistory = [];
        this.messageCount = 0;
        this.tokenCount = 0;
        this.isInitialized = false;
        this.puterUser = null;
        this.isAuthenticated = false;
        this.isMobile = window.innerWidth <= 768;
        
        // Model configurations lengkap
        this.models = {
            // OpenAI Models
            'gpt-4o-mini': { provider: 'OpenAI', vision: true, files: true, reasoning: false },
            'gpt-4o': { provider: 'OpenAI', vision: true, files: true, reasoning: false },
            'o1': { provider: 'OpenAI', vision: false, files: false, reasoning: true },
            'o1-mini': { provider: 'OpenAI', vision: false, files: false, reasoning: true },
            'o1-pro': { provider: 'OpenAI', vision: false, files: false, reasoning: true },
            'o3': { provider: 'OpenAI', vision: false, files: false, reasoning: true },
            'o3-mini': { provider: 'OpenAI', vision: false, files: false, reasoning: true },
            'o4-mini': { provider: 'OpenAI', vision: false, files: false, reasoning: true },
            'gpt-4.1': { provider: 'OpenAI', vision: true, files: true, reasoning: false },
            'gpt-4.1-mini': { provider: 'OpenAI', vision: true, files: true, reasoning: false },
            'gpt-4.1-nano': { provider: 'OpenAI', vision: false, files: false, reasoning: false },
            'gpt-4.5-preview': { provider: 'OpenAI', vision: true, files: true, reasoning: false },
            
            // Anthropic Models
            'claude-sonnet-4': { provider: 'Anthropic', vision: true, files: true, reasoning: false },
            'claude-opus-4': { provider: 'Anthropic', vision: true, files: true, reasoning: false },
            'claude-3-7-sonnet': { provider: 'Anthropic', vision: true, files: true, reasoning: false },
            'claude-3-5-sonnet': { provider: 'Anthropic', vision: true, files: true, reasoning: false },
            
            // DeepSeek Models
            'deepseek-chat': { provider: 'DeepSeek', vision: false, files: false, reasoning: false },
            'deepseek-reasoner': { provider: 'DeepSeek', vision: false, files: false, reasoning: true },
            
            // Google Models
            'gemini-2.0-flash': { provider: 'Google', vision: true, files: true, reasoning: false },
            'gemini-1.5-flash': { provider: 'Google', vision: true, files: true, reasoning: false },
            'google/gemma-2-27b-it': { provider: 'Google', vision: false, files: false, reasoning: false },
            
            // Meta Models
            'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo': { provider: 'Meta', vision: false, files: false, reasoning: false },
            'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo': { provider: 'Meta', vision: false, files: false, reasoning: false },
            'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo': { provider: 'Meta', vision: false, files: false, reasoning: false },
            
            // Mistral Models
            'mistral-large-latest': { provider: 'Mistral', vision: false, files: false, reasoning: false },
            'pixtral-large-latest': { provider: 'Mistral', vision: true, files: true, reasoning: false },
            'codestral-latest': { provider: 'Mistral', vision: false, files: false, reasoning: false },
            
            // xAI
            'grok-beta': { provider: 'xAI', vision: false, files: false, reasoning: false }
        };
        
        // Bind methods
        this.generateImage = this.generateImage.bind(this);
        this.startVoiceInput = this.startVoiceInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        this.init();
    }

    async init() {
        try {
            this.showLoading('Initializing SebastianLabs...');
            await this.waitForPuter();
            this.setupEventListeners();
            this.initializeUI();
            this.setupMobileFeatures();
            await this.testAPIConnection();
            this.hideLoading();
            this.isInitialized = true;
            this.showNotification('🚀 SebastianLabs is ready!', 'success');
        } catch (error) {
            console.error('Initialization error:', error);
            this.hideLoading();
            this.showNotification('❌ Failed to initialize: ' + error.message, 'error');
        }
    }

    async waitForPuter() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 100;
            
            const checkPuter = async () => {
                attempts++;
                try {
                    if (typeof puter !== 'undefined' && puter.ai && puter.fs && puter.auth) {
                        console.log('✅ Puter.js loaded successfully');
                        await this.initializePuterAuth();
                        resolve();
                    } else if (attempts >= maxAttempts) {
                        reject(new Error('Puter.js failed to load after maximum attempts'));
                    } else {
                        setTimeout(checkPuter, 100);
                    }
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        reject(error);
                    } else {
                        setTimeout(checkPuter, 100);
                    }
                }
            };
            checkPuter();
        });
    }

    async initializePuterAuth() {
        try {
            this.puterUser = await puter.auth.getUser();
            this.isAuthenticated = true;
            console.log('✅ Authenticated with Puter:', this.puterUser);
        } catch (error) {
            console.log('ℹ️ Running in guest mode');
            this.isAuthenticated = false;
        }
    }

    async testAPIConnection() {
        try {
            console.log('Testing API connection...');
            const testResponse = await puter.ai.chat('Hi', { 
                model: this.currentModel,
                stream: false 
            });
            console.log('✅ API connection successful:', testResponse);
        } catch (error) {
            console.warn('⚠️ API test failed:', error.message);
        }
    }

    setupEventListeners() {
        try {
            // Model selection (desktop)
            document.querySelectorAll('input[name="model"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    this.switchModel(e.target.value);
                });
            });

            // Category toggles (desktop)
            document.querySelectorAll('.category-header').forEach(header => {
                header.addEventListener('click', () => {
                    const category = header.parentElement;
                    category.classList.toggle('active');
                });
            });

            // Sidebar toggle (desktop)
            const sidebarToggle = document.getElementById('sidebarToggle');
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', () => {
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar) {
                        sidebar.classList.toggle('collapsed');
                    }
                });
            }

            // Header buttons
            this.bindHeaderButtons();

            // File upload
            this.setupFileUpload();

            // Message input
            this.setupMessageInput();

            // Quick start buttons
            this.setupQuickStartButtons();

            // AI tools
            this.setupAITools();

            // Mobile specific
            this.setupMobileEventListeners();

            // Keyboard shortcuts
            this.setupKeyboardShortcuts();

            // Resize handler
            window.addEventListener('resize', this.handleResize);

        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    setupMobileEventListeners() {
        // Mobile FAB
        const modelSelectorFab = document.getElementById('modelSelectorFab');
        if (modelSelectorFab) {
            modelSelectorFab.addEventListener('click', () => {
                this.showMobileModelSelector();
            });
        }

        // Mobile model overlay close
        const closeModelDrawer = document.getElementById('closeModelDrawer');
        if (closeModelDrawer) {
            closeModelDrawer.addEventListener('click', () => {
                this.hideMobileModelSelector();
            });
        }

        // Mobile overlay background close
        const mobileModelOverlay = document.getElementById('mobileModelOverlay');
        if (mobileModelOverlay) {
            mobileModelOverlay.addEventListener('click', (e) => {
                if (e.target === mobileModelOverlay) {
                    this.hideMobileModelSelector();
                }
            });
        }

        // Mobile tools
        document.getElementById('mobileFileBtn')?.addEventListener('click', () => {
            document.getElementById('mobileFileInput')?.click();
        });

        document.getElementById('mobileImageGenBtn')?.addEventListener('click', this.generateImage);
        document.getElementById('mobileVoiceBtn')?.addEventListener('click', this.startVoiceInput);

        // Mobile file input
        document.getElementById('mobileFileInput')?.addEventListener('change', (e) => {
            this.handleFileUpload(Array.from(e.target.files || []));
        });
    }

    setupMobileFeatures() {
        if (this.isMobile) {
            this.setupMobileModelGrid();
            this.updateMobileFAB();
        }
    }

    setupMobileModelGrid() {
        const mobileModelGrid = document.getElementById('mobileModelGrid');
        if (!mobileModelGrid) return;

        mobileModelGrid.innerHTML = '';

        Object.entries(this.models).forEach(([modelKey, modelData]) => {
            const modelCard = document.createElement('div');
            modelCard.className = 'mobile-model-card';
            if (modelKey === this.currentModel) {
                modelCard.classList.add('active');
            }

            modelCard.innerHTML = `
                <div class="mobile-model-name">${this.getDisplayName(modelKey)}</div>
                <div class="mobile-model-provider">${modelData.provider}</div>
                <div class="mobile-model-features">
                    ${modelData.vision ? '<span class="feature vision">Vision</span>' : ''}
                    ${modelData.files ? '<span class="feature fast">Files</span>' : ''}
                    ${modelData.reasoning ? '<span class="feature reasoning">Reasoning</span>' : ''}
                </div>
            `;

            modelCard.addEventListener('click', () => {
                this.switchModel(modelKey);
                this.hideMobileModelSelector();
            });

            mobileModelGrid.appendChild(modelCard);
        });
    }

    getDisplayName(modelKey) {
        const displayNames = {
            'gpt-4o-mini': 'GPT-4o Mini',
            'gpt-4o': 'GPT-4o',
            'o1': 'O1',
            'o1-mini': 'O1 Mini',
            'o1-pro': 'O1 Pro',
            'o3': 'O3',
            'o3-mini': 'O3 Mini',
            'o4-mini': 'O4 Mini',
            'gpt-4.1': 'GPT-4.1',
            'gpt-4.1-mini': 'GPT-4.1 Mini',
            'gpt-4.1-nano': 'GPT-4.1 Nano',
            'gpt-4.5-preview': 'GPT-4.5 Preview',
            'claude-sonnet-4': 'Claude Sonnet 4',
            'claude-opus-4': 'Claude Opus 4',
            'claude-3-7-sonnet': 'Claude 3.7 Sonnet',
            'claude-3-5-sonnet': 'Claude 3.5 Sonnet',
            'deepseek-chat': 'DeepSeek Chat',
            'deepseek-reasoner': 'DeepSeek Reasoner',
            'gemini-2.0-flash': 'Gemini 2.0 Flash',
            'gemini-1.5-flash': 'Gemini 1.5 Flash',
            'google/gemma-2-27b-it': 'Gemma 2 27B',
            'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo': 'Llama 3.1 8B',
            'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo': 'Llama 3.1 70B',
            'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo': 'Llama 3.1 405B',
            'mistral-large-latest': 'Mistral Large',
            'pixtral-large-latest': 'Pixtral Large',
            'codestral-latest': 'Codestral',
            'grok-beta': 'Grok Beta'
        };
        return displayNames[modelKey] || modelKey;
    }

    showMobileModelSelector() {
        const overlay = document.getElementById('mobileModelOverlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideMobileModelSelector() {
        const overlay = document.getElementById('mobileModelOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    updateMobileFAB() {
        const currentModelName = document.getElementById('currentModelName');
        if (currentModelName) {
            currentModelName.textContent = this.getDisplayName(this.currentModel);
        }
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== this.isMobile) {
            if (this.isMobile) {
                this.setupMobileFeatures();
            }
            // Hide mobile overlay if switching to desktop
            if (!this.isMobile) {
                this.hideMobileModelSelector();
            }
        }
    }

    bindHeaderButtons() {
        const buttons = [
            { id: 'clearChatBtn', handler: () => this.clearChat() },
            { id: 'exportChatBtn', handler: () => this.exportChat() },
            { id: 'themeToggle', handler: () => this.toggleTheme() }
        ];

        buttons.forEach(({ id, handler }) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', handler);
            }
        });
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const attachBtn = document.getElementById('attachBtn');

        if (uploadArea) {
            uploadArea.addEventListener('click', () => {
                if (fileInput) fileInput.click();
            });
        }

        if (attachBtn) {
            attachBtn.addEventListener('click', () => {
                if (fileInput) fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(Array.from(e.target.files || []));
            });
        }

        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = Array.from(e.dataTransfer?.files || []);
                this.handleFileUpload(files);
            });
        }
    }

    setupMessageInput() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');

        if (messageInput) {
            messageInput.addEventListener('input', () => {
                this.autoResizeTextarea();
                this.updateSendButton();
            });

            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
    }

    setupQuickStartButtons() {
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const promptText = btn.dataset.prompt;
                if (promptText) {
                    this.sendQuickMessage(promptText);
                }
            });
        });
    }

    setupAITools() {
        const tools = [
            { id: 'imageGenBtn', handler: this.generateImage },
            { id: 'voiceBtn', handler: this.startVoiceInput },
            { id: 'voiceInputBtn', handler: this.startVoiceInput }
        ];

        tools.forEach(({ id, handler }) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', handler);
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.clearChat();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.exportChat();
            }
        });
    }

    initializeUI() {
        this.updateModelDisplay();
        this.updateModelSupport();
        
        const firstCategory = document.querySelector('.model-category');
        if (firstCategory) {
            firstCategory.classList.add('active');
        }

        this.updateSendButton();
        
        if (this.isMobile) {
            this.setupMobileFeatures();
        }
    }

    switchModel(modelName) {
        if (this.models[modelName]) {
            this.currentModel = modelName;
            this.currentProvider = this.models[modelName].provider;
            this.updateModelDisplay();
            this.updateModelSupport();
            
            // Update desktop radio button
            const radio = document.querySelector(`input[name="model"][value="${modelName}"]`);
            if (radio) {
                radio.checked = true;
            }
            
            // Update mobile FAB and grid
            if (this.isMobile) {
                this.updateMobileFAB();
                this.setupMobileModelGrid();
            }
            
            console.log(`✅ Model switched to: ${modelName} (${this.currentProvider})`);
            this.showNotification(`Switched to ${this.getDisplayName(modelName)}`, 'info');
        }
    }

    updateModelDisplay() {
        const currentModelEl = document.getElementById('currentModel');
        const currentProviderEl = document.getElementById('currentProvider');
        
        if (currentModelEl) currentModelEl.textContent = this.getDisplayName(this.currentModel);
        if (currentProviderEl) currentProviderEl.textContent = this.currentProvider;
    }

    updateModelSupport() {
        const modelSupport = document.getElementById('modelSupport');
        const model = this.models[this.currentModel];
        
        if (modelSupport && model) {
            const features = [];
            if (model.vision) features.push('vision');
            if (model.files) features.push('files');
            if (model.reasoning) features.push('reasoning');
            
            if (features.length > 0) {
                modelSupport.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Model supports ${features.join(', ')}</span>
                `;
                modelSupport.classList.remove('no-support');
            } else {
                modelSupport.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                    <span>Text-only model</span>
                `;
                modelSupport.classList.add('no-support');
            }
        }
    }

    async handleFileUpload(files) {
        if (!files || files.length === 0) return;

        for (const file of files) {
            if (!this.isValidFile(file)) {
                this.showNotification(`❌ Invalid file: ${file.name}`, 'error');
                continue;
            }

            try {
                this.showNotification(`📤 Processing ${file.name}...`, 'info');
                
                const fileObj = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: file.type,
                    size: this.formatFileSize(file.size),
                    file: file,
                    isLocal: true
                };

                if (file.type.startsWith('image/')) {
                    fileObj.url = URL.createObjectURL(file);
                } else if (file.type === 'application/pdf') {
                    const content = await this.extractPDFContent(file);
                    fileObj.content = content;
                    fileObj.url = URL.createObjectURL(file);
                } else if (file.type === 'text/plain') {
                    const content = await this.readTextFile(file);
                    fileObj.content = content;
                    fileObj.url = URL.createObjectURL(file);
                } else {
                    fileObj.url = URL.createObjectURL(file);
                }

                if (this.isAuthenticated) {
                    try {
                        const uploadResult = await puter.fs.upload([file]);
                        if (uploadResult && uploadResult.length > 0) {
                            const result = uploadResult[0];
                            if (result.url) {
                                fileObj.url = result.url;
                                fileObj.puterPath = result.path || result.name;
                                fileObj.isLocal = false;
                            }
                        }
                    } catch (uploadError) {
                        console.warn('Puter upload failed, using local processing:', uploadError);
                    }
                }

                this.uploadedFiles.push(fileObj);
                this.displayUploadedFiles();
                this.showNotification(`✅ ${file.name} processed successfully`, 'success');

            } catch (error) {
                console.error('File processing error:', error);
                this.showNotification(`❌ Failed to process ${file.name}`, 'error');
            }
        }
    }

    async extractPDFContent(file) {
        try {
            const text = await this.readTextFile(file);
            return text || `PDF file: ${file.name}`;
        } catch (error) {
            console.warn('PDF extraction failed:', error);
            return `PDF file: ${file.name} (content extraction failed)`;
        }
    }

    async readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    isValidFile(file) {
        const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
            'application/pdf', 'text/plain', 'text/csv',
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        const maxSize = 50 * 1024 * 1024; // 50MB
        
        return allowedTypes.includes(file.type) && file.size <= maxSize;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    displayUploadedFiles() {
        const container = document.getElementById('uploadedFiles');
        const attachedContainer = document.getElementById('attachedFiles');
        
        if (container) container.innerHTML = '';
        if (attachedContainer) attachedContainer.innerHTML = '';

        this.uploadedFiles.forEach(file => {
            if (container) {
                const fileEl = document.createElement('div');
                fileEl.className = 'file-item';
                fileEl.innerHTML = `
                    <div class="file-info">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                        <div>
                            <div class="file-name">${this.escapeHtml(file.name)}</div>
                            <div style="font-size: 12px; color: var(--text-muted);">${file.size}</div>
                        </div>
                    </div>
                    <svg class="file-remove" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                `;
                
                const removeBtn = fileEl.querySelector('.file-remove');
                if (removeBtn) {
                    removeBtn.addEventListener('click', () => this.removeFile(file.id));
                }
                
                container.appendChild(fileEl);
            }

            if (attachedContainer) {
                const attachedEl = document.createElement('div');
                attachedEl.className = 'attached-file';
                attachedEl.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <span>${this.escapeHtml(file.name)}</span>
                    <svg class="remove-file" viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                `;
                
                const removeBtn = attachedEl.querySelector('.remove-file');
                if (removeBtn) {
                    removeBtn.addEventListener('click', () => this.removeFile(file.id));
                }
                
                attachedContainer.appendChild(attachedEl);
            }
        });

        this.updateSendButton();
    }

    removeFile(fileId) {
        const file = this.uploadedFiles.find(f => f.id === fileId);
        if (file && file.isLocal && file.url && file.url.startsWith('blob:')) {
            URL.revokeObjectURL(file.url);
        }

        this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);
        this.displayUploadedFiles();
        this.showNotification('🗑️ File removed', 'info');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    autoResizeTextarea() {
        const textarea = document.getElementById('messageInput');
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    }

    updateSendButton() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (messageInput && sendBtn) {
            const hasText = messageInput.value.trim().length > 0;
            const hasFiles = this.uploadedFiles.length > 0;
            sendBtn.disabled = !hasText && !hasFiles;
        }
    }

    sendQuickMessage(promptText) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = promptText;
            this.autoResizeTextarea();
            this.updateSendButton();
            this.sendMessage();
        }
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        if (!messageInput) return;

        const message = messageInput.value.trim();
        if (!message && this.uploadedFiles.length === 0) return;

        try {
            // Force hide welcome screen
            const welcomeScreen = document.getElementById('welcomeScreen');
            if (welcomeScreen) {
                welcomeScreen.style.display = 'none';
            }

            // Show chat messages container
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.style.display = 'flex';
            }

            this.addMessage('user', message, [...this.uploadedFiles]);

            messageInput.value = '';
            this.autoResizeTextarea();
            const filesForMessage = [...this.uploadedFiles];
            this.uploadedFiles = [];
            this.displayUploadedFiles();
            this.updateSendButton();

            this.showTypingIndicator();

            let response = await this.callPuterAI(message, filesForMessage);
            
            this.hideTypingIndicator();
            this.addMessage('ai', response);

        } catch (error) {
            console.error('Send message error:', error);
            this.hideTypingIndicator();
            this.addMessage('ai', this.getErrorMessage(error));
            this.showNotification('Error: ' + error.message, 'error');
        }
    }

    async callPuterAI(message, files = []) {
        try {
            const model = this.models[this.currentModel];
            
            console.log(`🤖 Using model: ${this.currentModel} from ${this.currentProvider}`);
            console.log(`📋 Model config:`, model);

            let fullMessage = message;
            
            const textFiles = files.filter(f => !f.type.startsWith('image/') && f.content);
            if (textFiles.length > 0) {
                const fileContents = textFiles.map(f => `\n\n--- Content of ${f.name} ---\n${f.content}`).join('');
                fullMessage += fileContents;
            }

            let response;

            if (model?.vision && files.some(f => f.type.startsWith('image/'))) {
                const imageFiles = files.filter(f => f.type.startsWith('image/'));
                console.log(`🖼️ Processing ${imageFiles.length} images with vision model`);
                
                if (imageFiles.length === 1) {
                    response = await puter.ai.chat(fullMessage, imageFiles[0].url, false, {
                        model: this.currentModel
                    });
                } else if (imageFiles.length > 1) {
                    const imageUrls = imageFiles.map(f => f.url);
                    response = await puter.ai.chat(fullMessage, imageUrls, false, {
                        model: this.currentModel
                    });
                } else {
                    response = await puter.ai.chat(fullMessage, {
                        model: this.currentModel
                    });
                }
            } else {
                console.log(`💬 Processing text-only message`);
                response = await puter.ai.chat(fullMessage, {
                    model: this.currentModel
                });
            }

            console.log(`✅ Raw AI response from ${this.currentModel}:`, response);
            return this.formatAIResponse(response);

        } catch (error) {
            console.error(`❌ Puter AI call error with ${this.currentModel}:`, error);
            throw error;
        }
    }

    formatAIResponse(response) {
        console.log('🔄 Formatting response:', response);
        
        if (!response) {
            return `No response received from ${this.currentModel}.`;
        }
        
        if (typeof response === 'string') {
            return response;
        } 
        
        if (response && typeof response === 'object') {
            if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
                const choice = response.choices[0];
                
                if (choice.delta && choice.delta.content) {
                    return choice.delta.content;
                }
                
                if (choice.message && choice.message.content) {
                    return choice.message.content;
                }
                
                if (choice.text) {
                    return choice.text;
                }
            }
            
            const possibleProps = ['message', 'text', 'content', 'response', 'output', 'result'];
            for (const prop of possibleProps) {
                if (response[prop]) {
                    if (typeof response[prop] === 'string') {
                        return response[prop];
                    }
                    if (response[prop].content) {
                        return response[prop].content;
                    }
                }
            }
            
            return `Response from ${this.currentModel}:\n${JSON.stringify(response, null, 2)}`;
        } 
        
        return String(response) || `Empty response from ${this.currentModel}`;
    }

    getErrorMessage(error) {
        if (error.message?.includes('unauthorized') || error.message?.includes('401')) {
            return '🔐 Authentication required. Please sign in to use AI features.';
        } else if (error.message?.includes('rate limit') || error.message?.includes('429')) {
            return '⏱️ Rate limit reached. Please wait a moment before trying again.';
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            return '🌐 Network error. Please check your connection and try again.';
        } else {
            return `❌ Error with ${this.currentModel}: ${error.message || 'Unknown error'}`;
        }
    }

    addMessage(sender, content, files = []) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender} fade-in-up`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? 
            '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>' :
            '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,1 12,8H11V10A1,1 0 0,1 10,11H9V12H22V10A1,1 0 0,1 23,9V4A2,2 0 0,1 21,2H12Z"/></svg>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        if (files.length > 0 && sender === 'user') {
            const filesDiv = document.createElement('div');
            filesDiv.className = 'message-files';
            files.forEach(file => {
                const fileEl = document.createElement('div');
                fileEl.className = 'file-attachment';
                fileEl.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <span>${this.escapeHtml(file.name)}</span>
                `;
                filesDiv.appendChild(fileEl);
            });
            messageContent.appendChild(filesDiv);
        }

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = this.formatMessage(content);

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageEl.appendChild(avatar);
        messageEl.appendChild(messageContent);

        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (sender === 'user') {
            this.messageHistory.push({ role: 'user', content });
            this.messageCount++;
        } else {
            this.messageHistory.push({ role: 'assistant', content });
        }

        this.tokenCount += content.length;
        this.updateStats();
    }

    formatMessage(text) {
        if (typeof text !== 'string') return '';
        
        try {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>')
                .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 12px; margin: 8px 0;" loading="lazy">');
        } catch (error) {
            console.error('Format message error:', error);
            return this.escapeHtml(text);
        }
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        this.hideTypingIndicator();

        const typingEl = document.createElement('div');
        typingEl.className = 'message ai';
        typingEl.id = 'typing-indicator';
        typingEl.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,1 12,8H11V10A1,1 0 0,1 10,11H9V12H22V10A1,1 0 0,1 23,9V4A2,2 0 0,1 21,2H12Z"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    updateStats() {
        const messageCountEl = document.getElementById('messageCount');
        const tokenCountEl = document.getElementById('tokenCount');
        
        if (messageCountEl) messageCountEl.textContent = `${this.messageCount} messages`;
        if (tokenCountEl) tokenCountEl.textContent = `${this.tokenCount} tokens`;
    }

    async generateImage() {
        const imagePrompt = window.prompt('Enter image description:');
        if (!imagePrompt) return;

        try {
            this.showNotification('🎨 Generating image...', 'info');
            this.addMessage('user', `Generate image: ${imagePrompt}`);
            this.showTypingIndicator();

            const imageResult = await puter.ai.txt2img(imagePrompt);
            
            this.hideTypingIndicator();
            
            if (imageResult) {
                let imageUrl = '';
                
                if (typeof imageResult === 'string') {
                    imageUrl = imageResult;
                } else if (imageResult instanceof HTMLImageElement) {
                    imageUrl = imageResult.src;
                } else if (imageResult.url) {
                    imageUrl = imageResult.url;
                } else {
                    console.log('Unexpected image result format:', imageResult);
                    this.addMessage('ai', `Image generation completed: ${JSON.stringify(imageResult)}`);
                    return;
                }
                
                this.addMessage('ai', `🎨 Image generated successfully!\n\n![Generated Image](${imageUrl})`);
                this.showNotification('✅ Image generated!', 'success');
            } else {
                this.addMessage('ai', '❌ Failed to generate image. Please try again.');
                this.showNotification('❌ Image generation failed', 'error');
            }

        } catch (error) {
            this.hideTypingIndicator();
            console.error('Image generation error:', error);
            this.addMessage('ai', this.getErrorMessage(error));
            this.showNotification('Error generating image', 'error');
        }
    }

    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showNotification('❌ Speech recognition not supported in this browser', 'error');
            return;
        }

        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognition.continuous = false;

            const voiceBtn = document.getElementById('voiceInputBtn') || 
                            document.getElementById('voiceBtn') || 
                            document.getElementById('mobileVoiceBtn');
            if (voiceBtn) {
                voiceBtn.style.color = 'var(--primary)';
            }

            recognition.onstart = () => {
                this.showNotification('🎤 Listening... Please speak', 'info');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const messageInput = document.getElementById('messageInput');
                if (messageInput) {
                    messageInput.value = transcript;
                    this.autoResizeTextarea();
                    this.updateSendButton();
                }
                this.showNotification('✅ Voice input received', 'success');
            };

            recognition.onerror = (event) => {
                let errorMsg = 'Speech recognition error';
                switch(event.error) {
                    case 'network':
                        errorMsg = 'Network error during speech recognition';
                        break;
                    case 'not-allowed':
                        errorMsg = 'Microphone access denied';
                        break;
                    case 'no-speech':
                        errorMsg = 'No speech detected';
                        break;
                }
                this.showNotification(`❌ ${errorMsg}`, 'error');
            };

            recognition.onend = () => {
                if (voiceBtn) {
                    voiceBtn.style.color = '';
                }
            };

            recognition.start();

        } catch (error) {
            console.error('Voice input error:', error);
            this.showNotification('❌ Failed to start voice input', 'error');
        }
    }

    clearChat() {
        if (!confirm('Are you sure you want to clear the chat?')) return;

        const chatMessages = document.getElementById('chatMessages');
        const welcomeScreen = document.getElementById('welcomeScreen');
        
        if (chatMessages) chatMessages.innerHTML = '';
        if (welcomeScreen) welcomeScreen.style.display = 'flex';
        
        this.messageHistory = [];
        this.messageCount = 0;
        this.tokenCount = 0;
        this.updateStats();
        this.showNotification('🧹 Chat cleared', 'info');
    }

    exportChat() {
        if (this.messageHistory.length === 0) {
            this.showNotification('❌ No messages to export', 'warning');
            return;
        }

        try {
            const timestamp = new Date().toISOString();
            const chatText = `SebastianLabs Chat Export\n${'='.repeat(50)}\n` +
                           `Export Date: ${new Date().toLocaleString()}\n` +
                           `Model: ${this.getDisplayName(this.currentModel)} (${this.currentProvider})\n` +
                           `Messages: ${this.messageCount} | Tokens: ${this.tokenCount}\n` +
                           `${'='.repeat(50)}\n\n` +
                           this.messageHistory.map(msg => 
                               `${msg.role.toUpperCase()}: ${msg.content}\n${'-'.repeat(30)}`
                           ).join('\n\n');
            
            const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `sebastianlabs-chat-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('📄 Chat exported successfully', 'success');

        } catch (error) {
            console.error('Export error:', error);
            this.showNotification('❌ Failed to export chat', 'error');
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isDark = !document.body.classList.contains('light-theme');
        
        localStorage.setItem('darkTheme', isDark.toString());
        
        this.showNotification(
            isDark ? '🌙 Dark theme enabled' : '☀️ Light theme enabled', 
            'info'
        );
    }

    showLoading(text = 'Loading...') {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingText = document.getElementById('loadingText');
        
        if (loadingScreen) loadingScreen.classList.remove('hidden');
        if (loadingText) loadingText.textContent = text;
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
            error: '<path fill="currentColor" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>',
            warning: '<path fill="currentColor" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>',
            info: '<path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>'
        };
        
        notification.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                ${icons[type] || icons.info}
            </svg>
            <span>${this.escapeHtml(message)}</span>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }
}

// Initialize SebastianLabs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.sebastianLabs = new SebastianLabs();
        
        // Restore theme preference
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'false') {
            document.body.classList.add('light-theme');
        }
        
    } catch (error) {
        console.error('Failed to initialize SebastianLabs:', error);
    }
});

// Global error handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.sebastianLabs) {
        window.sebastianLabs.showNotification('❌ An unexpected error occurred', 'error');
    }
    event.preventDefault();
});

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (window.sebastianLabs) {
        window.sebastianLabs.showNotification('❌ Application error occurred', 'error');
    }
});

console.log('🚀 SebastianLabs JavaScript loaded successfully!');
