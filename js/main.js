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
        this.currentMobileTab = 'chat';
        
        // Complete Model Configuration
        this.models = {
            'gpt-4o-mini': { 
                provider: 'OpenAI', 
                displayName: 'GPT-4o Mini',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'fast']
            },
            'gpt-4o': { 
                provider: 'OpenAI', 
                displayName: 'GPT-4o',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            'o1': { 
                provider: 'OpenAI', 
                displayName: 'O1',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning', 'premium']
            },
            'o1-mini': { 
                provider: 'OpenAI', 
                displayName: 'O1 Mini',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning']
            },
            'o1-pro': { 
                provider: 'OpenAI', 
                displayName: 'O1 Pro',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning', 'premium']
            },
            'o3': { 
                provider: 'OpenAI', 
                displayName: 'O3',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning', 'premium']
            },
            'o3-mini': { 
                provider: 'OpenAI', 
                displayName: 'O3 Mini',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning']
            },
            'o4-mini': { 
                provider: 'OpenAI', 
                displayName: 'O4 Mini',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning']
            },
            'gpt-4.1': { 
                provider: 'OpenAI', 
                displayName: 'GPT-4.1',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            'gpt-4.1-mini': { 
                provider: 'OpenAI', 
                displayName: 'GPT-4.1 Mini',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'fast']
            },
            'gpt-4.1-nano': { 
                provider: 'OpenAI', 
                displayName: 'GPT-4.1 Nano',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['fast']
            },
            'gpt-4.5-preview': { 
                provider: 'OpenAI', 
                displayName: 'GPT-4.5 Preview',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            
            // Anthropic Models
            'claude-sonnet-4': { 
                provider: 'Anthropic', 
                displayName: 'Claude Sonnet 4',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            'claude-opus-4': { 
                provider: 'Anthropic', 
                displayName: 'Claude Opus 4',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            'claude-3-7-sonnet': { 
                provider: 'Anthropic', 
                displayName: 'Claude 3.7 Sonnet',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            'claude-3-5-sonnet': { 
                provider: 'Anthropic', 
                displayName: 'Claude 3.5 Sonnet',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            
            // DeepSeek Models
            'deepseek-chat': { 
                provider: 'DeepSeek', 
                displayName: 'DeepSeek Chat',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['fast']
            },
            'deepseek-reasoner': { 
                provider: 'DeepSeek', 
                displayName: 'DeepSeek Reasoner',
                vision: false, 
                files: false, 
                reasoning: true,
                features: ['reasoning']
            },
            
            // Google Models
            'gemini-2.0-flash': { 
                provider: 'Google', 
                displayName: 'Gemini 2.0 Flash',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'fast']
            },
            'gemini-1.5-flash': { 
                provider: 'Google', 
                displayName: 'Gemini 1.5 Flash',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'fast']
            },
            'google/gemma-2-27b-it': { 
                provider: 'Google', 
                displayName: 'Gemma 2 27B',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['fast']
            },
            
            // Meta Models
            'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo': { 
                provider: 'Meta', 
                displayName: 'Llama 3.1 8B',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['fast']
            },
            'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo': { 
                provider: 'Meta', 
                displayName: 'Llama 3.1 70B',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['premium']
            },
            'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo': { 
                provider: 'Meta', 
                displayName: 'Llama 3.1 405B',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['premium']
            },
            
            // Mistral Models
            'mistral-large-latest': { 
                provider: 'Mistral', 
                displayName: 'Mistral Large',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['premium']
            },
            'pixtral-large-latest': { 
                provider: 'Mistral', 
                displayName: 'Pixtral Large',
                vision: true, 
                files: true, 
                reasoning: false,
                features: ['vision', 'premium']
            },
            'codestral-latest': { 
                provider: 'Mistral', 
                displayName: 'Codestral',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['premium']
            },
            
            // xAI
            'grok-beta': { 
                provider: 'xAI', 
                displayName: 'Grok Beta',
                vision: false, 
                files: false, 
                reasoning: false,
                features: ['premium']
            }
        };
        
        this.init();
    }

    async init() {
        try {
            this.showLoading('Initializing SebastianLabs...');
            
            await this.waitForPuter();
            this.setupEventListeners();
            this.setupUI();
            this.initializeChatArea();
            
            this.hideLoading();
            this.isInitialized = true;
            this.showToast('🚀 SebastianLabs is ready!', 'success');
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.hideLoading();
            this.showToast('❌ Failed to initialize: ' + error.message, 'error');
        }
    }

    async waitForPuter() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const checkPuter = async () => {
                attempts++;
                try {
                    if (typeof puter !== 'undefined' && puter.ai) {
                        console.log('✅ Puter.js loaded successfully');
                        await this.initializePuterAuth();
                        resolve();
                    } else if (attempts >= maxAttempts) {
                        console.warn('⚠️ Puter.js not loaded, using demo mode');
                        this.isAuthenticated = false;
                        resolve();
                    } else {
                        setTimeout(checkPuter, 100);
                    }
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        console.warn('⚠️ Puter auth failed, using demo mode');
                        resolve();
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
            if (puter.auth) {
                this.puterUser = await puter.auth.getUser();
                this.isAuthenticated = true;
                console.log('✅ Authenticated with Puter');
            }
        } catch (error) {
            console.log('ℹ️ Running in guest mode');
            this.isAuthenticated = false;
        }
    }

    initializeChatArea() {
        const chatContainer = document.getElementById('chatMessages');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        if (chatContainer) {
            chatContainer.style.display = 'flex';
            chatContainer.style.flexDirection = 'column';
            chatContainer.style.gap = 'var(--space-4)';
            chatContainer.innerHTML = '';
        }

        if (welcomeMessage) {
            welcomeMessage.style.display = 'flex';
        }

        console.log('✅ Chat area initialized');
    }

    setupEventListeners() {
        // Model selector
        document.getElementById('currentModelDisplay')?.addEventListener('click', () => {
            this.showModelSelector();
        });

        document.getElementById('modalClose')?.addEventListener('click', () => {
            this.hideModelSelector();
        });

        document.getElementById('modalBackdrop')?.addEventListener('click', () => {
            this.hideModelSelector();
        });

        // Header actions
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('clearChatBtn')?.addEventListener('click', () => {
            this.clearChat();
        });

        document.getElementById('exportChatBtn')?.addEventListener('click', () => {
            this.exportChat();
        });

        // Message input
        this.setupMessageInput();
        
        // File upload
        this.setupFileUpload();
        
        // AI tools
        this.setupAITools();
        
        // Quick actions
        this.setupQuickActions();
        
        // Mobile nav
        this.setupMobileNavigation();
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
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
    }

    setupFileUpload() {
        const fileInput = document.getElementById('fileInput');
        const attachBtn = document.getElementById('attachFileBtn');
        const uploadZone = document.getElementById('uploadZone');

        if (attachBtn && fileInput) {
            attachBtn.addEventListener('click', () => fileInput.click());
        }

        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', () => fileInput.click());
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFiles(Array.from(e.target.files || []));
            });
        }
    }

    setupAITools() {
        document.getElementById('imageGenTool')?.addEventListener('click', () => {
            this.generateImage();
        });

        document.getElementById('voiceTool')?.addEventListener('click', () => {
            this.startVoiceInput();
        });

        document.getElementById('voiceInputBtn')?.addEventListener('click', () => {
            this.startVoiceInput();
        });
    }

    setupQuickActions() {
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.dataset.prompt;
                if (prompt) {
                    this.sendQuickMessage(prompt);
                }
            });
        });
    }

    setupMobileNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.tab;
                this.switchMobileTab(tab);
            });
        });
    }

    setupUI() {
        this.updateModelDisplay();
        this.populateModels();
        this.updateModelStatus();
        this.updateStats();
    }

    showModelSelector() {
        const modal = document.getElementById('modelSelectorModal');
        if (modal) {
            this.populateModalModels();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModelSelector() {
        const modal = document.getElementById('modelSelectorModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    populateModalModels() {
        const container = document.getElementById('modalModelGrid');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(this.models).forEach(([modelKey, model]) => {
            const modelCard = document.createElement('div');
            modelCard.className = `modal-model-card ${modelKey === this.currentModel ? 'active' : ''}`;
            modelCard.dataset.model = modelKey;
            
            modelCard.innerHTML = `
                <div class="modal-model-title">${model.displayName}</div>
                <div class="modal-model-provider">${model.provider}</div>
                <div class="modal-model-features">
                    ${model.features.map(feature => `
                        <span class="feature-tag ${feature}">${feature.toUpperCase()}</span>
                    `).join('')}
                </div>
            `;

            modelCard.addEventListener('click', () => {
                this.switchModel(modelKey);
                this.hideModelSelector();
            });

            container.appendChild(modelCard);
        });
    }

    populateModels() {
        const modelCategories = document.getElementById('modelCategories');
        if (modelCategories) {
            this.populateDesktopModels(modelCategories);
        }
    }

    populateDesktopModels(container) {
        const providers = this.groupModelsByProvider();
        container.innerHTML = '';

        Object.entries(providers).forEach(([provider, models]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'model-category expanded';
            
            categoryDiv.innerHTML = `
                <div class="category-header">
                    <div class="category-header-content">
                        <svg class="category-icon" viewBox="0 0 24 24" width="16" height="16">
                            ${this.getProviderIcon(provider)}
                        </svg>
                        <span class="category-name">${provider}</span>
                    </div>
                    <svg class="chevron-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                    </svg>
                </div>
                <div class="model-list">
                    ${models.map(([modelKey, model]) => `
                        <div class="model-item ${modelKey === this.currentModel ? 'active' : ''}" data-model="${modelKey}">
                            <div class="model-radio"></div>
                            <div class="model-details">
                                <div class="model-title">${model.displayName}</div>
                                <div class="model-features">
                                    ${model.features.map(feature => `
                                        <span class="feature-tag ${feature}">${feature.toUpperCase()}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Add model selection events
            categoryDiv.querySelectorAll('.model-item').forEach(item => {
                item.addEventListener('click', () => {
                    const modelKey = item.dataset.model;
                    this.switchModel(modelKey);
                });
            });

            container.appendChild(categoryDiv);
        });
    }

    groupModelsByProvider() {
        const grouped = {};
        Object.entries(this.models).forEach(([key, model]) => {
            if (!grouped[model.provider]) {
                grouped[model.provider] = [];
            }
            grouped[model.provider].push([key, model]);
        });
        return grouped;
    }

    getProviderIcon(provider) {
        const icons = {
            'OpenAI': '<path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-10 8c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
            'Anthropic': '<path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
            'Google': '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2z"/>',
            'DeepSeek': '<path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>',
            'Meta': '<path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>',
            'Mistral': '<path fill="currentColor" d="M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2Z"/>',
            'xAI': '<path fill="currentColor" d="M20 4L12 1L4 4V10C4 16 8.02 21.26 12 22C15.98 21.26 20 16 20 10V4Z"/>'
        };
        return icons[provider] || icons['OpenAI'];
    }

    switchModel(modelKey) {
        if (!this.models[modelKey]) return;

        this.currentModel = modelKey;
        this.currentProvider = this.models[modelKey].provider;
        
        this.updateModelDisplay();
        this.updateModelStatus();
        this.updateModelSelections();
        
        console.log(`✅ Switched to ${this.models[modelKey].displayName}`);
        this.showToast(`Switched to ${this.models[modelKey].displayName}`, 'info');
    }

    updateModelDisplay() {
        const model = this.models[this.currentModel];
        
        const currentModelName = document.getElementById('currentModelName');
        const currentModelProvider = document.getElementById('currentModelProvider');
        
        if (currentModelName) currentModelName.textContent = model.displayName;
        if (currentModelProvider) currentModelProvider.textContent = model.provider;
    }

    updateModelStatus() {
        const model = this.models[this.currentModel];
        const statusEl = document.getElementById('modelStatusText');
        
        if (statusEl) {
            const features = [];
            if (model.vision) features.push('vision');
            if (model.files) features.push('files');
            if (model.reasoning) features.push('reasoning');
            
            if (features.length > 0) {
                statusEl.textContent = `Model supports ${features.join(', ')}`;
            } else {
                statusEl.textContent = 'Text-only model';
            }
        }
    }

    updateModelSelections() {
        document.querySelectorAll('.model-item').forEach(item => {
            item.classList.toggle('active', item.dataset.model === this.currentModel);
        });

        document.querySelectorAll('.modal-model-card').forEach(card => {
            card.classList.toggle('active', card.dataset.model === this.currentModel);
        });
    }

    switchMobileTab(tab) {
        this.currentMobileTab = tab;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tab);
        });

        document.querySelectorAll('.mobile-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        if (tab !== 'chat') {
            const panel = document.getElementById(`${tab}Panel`);
            if (panel) {
                panel.classList.add('active');
            }
        }
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

    sendQuickMessage(prompt) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = prompt;
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
            // Hide welcome message
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }

            // Add user message
            this.addMessage('user', message, [...this.uploadedFiles]);

            // Clear input
            messageInput.value = '';
            this.autoResizeTextarea();
            const filesForMessage = [...this.uploadedFiles];
            this.uploadedFiles = [];
            this.displayFiles();
            this.updateSendButton();

            // Show typing indicator
            this.showTypingIndicator();

            // Send to AI - FIXED MODEL SELECTION
            let response;
            try {
                if (this.isAuthenticated && typeof puter !== 'undefined' && puter.ai) {
                    response = await this.callPuterAI(message, filesForMessage);
                } else {
                    response = await this.callDemoAI(message);
                }
            } catch (error) {
                console.error('AI call failed:', error);
                response = this.getErrorMessage(error);
            }
            
            this.hideTypingIndicator();
            this.addMessage('ai', response);

        } catch (error) {
            console.error('Send message error:', error);
            this.hideTypingIndicator();
            this.addMessage('ai', 'Sorry, something went wrong. Please try again.');
            this.showToast('Error: ' + error.message, 'error');
        }
    }

    async callPuterAI(message, files = []) {
        try {
            console.log(`🤖 Sending to ${this.models[this.currentModel].displayName} (${this.currentModel})`);
            
            // Prepare message with file content
            let fullMessage = message;
            const textFiles = files.filter(f => !f.type.startsWith('image/') && f.content);
            if (textFiles.length > 0) {
                const fileContents = textFiles.map(f => `\n\n--- ${f.name} ---\n${f.content}`).join('');
                fullMessage += fileContents;
            }

            let response;
            const model = this.models[this.currentModel];

            // Handle vision models with images
            if (model.vision && files.some(f => f.type.startsWith('image/'))) {
                const imageFiles = files.filter(f => f.type.startsWith('image/'));
                console.log(`🖼️ Using vision model with ${imageFiles.length} images`);
                
                if (imageFiles.length === 1) {
                    response = await puter.ai.chat(fullMessage, imageFiles[0].url, false, {
                        model: this.currentModel
                    });
                } else if (imageFiles.length > 1) {
                    const imageUrls = imageFiles.map(f => f.url);
                    response = await puter.ai.chat(fullMessage, imageUrls, false, {
                        model: this.currentModel
                    });
                }
            } else {
                // Text-only request with specific model
                response = await puter.ai.chat(fullMessage, {
                    model: this.currentModel
                });
            }

            console.log(`✅ Response received from ${this.currentModel}:`, response);
            return this.formatResponse(response);

        } catch (error) {
            console.error(`❌ Puter AI error with ${this.currentModel}:`, error);
            throw error;
        }
    }

    async callDemoAI(message) {
        // Simulate model-specific responses
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const model = this.models[this.currentModel];
        const demoResponses = {
            'OpenAI': [
                `Hello! I'm ${model.displayName} from OpenAI. You said: "${message}". I'm designed to be helpful, harmless, and honest.`,
                `As ${model.displayName}, I understand your message: "${message}". I'm powered by OpenAI's latest technology.`,
                `Hi there! This is ${model.displayName} responding to: "${message}". How can I assist you further?`
            ],
            'Anthropic': [
                `I'm Claude (${model.displayName}) from Anthropic. Regarding your message: "${message}" - I aim to be helpful, harmless, and honest.`,
                `Hello! I'm ${model.displayName} by Anthropic. You wrote: "${message}". I'm here to assist you thoughtfully.`,
                `This is ${model.displayName} from Anthropic responding to: "${message}". How may I help you today?`
            ],
            'Google': [
                `I'm ${model.displayName} from Google. Your message: "${message}" - I'm here to provide helpful and informative responses.`,
                `Hello! This is ${model.displayName} by Google. Regarding: "${message}" - I'm designed to be accurate and helpful.`,
                `Hi! I'm ${model.displayName} from Google responding to: "${message}". What else can I help you with?`
            ],
            'DeepSeek': [
                `I'm ${model.displayName} from DeepSeek. You said: "${message}". I specialize in reasoning and problem-solving.`,
                `Hello! This is ${model.displayName} by DeepSeek. Your message: "${message}" - I'm built for deep understanding.`,
                `Hi there! I'm ${model.displayName} from DeepSeek responding to: "${message}". How can I reason through this with you?`
            ],
            'Meta': [
                `I'm ${model.displayName} from Meta. Regarding: "${message}" - I'm designed to be open and transparent.`,
                `Hello! This is ${model.displayName} by Meta. You wrote: "${message}". I'm here to provide helpful responses.`,
                `Hi! I'm ${model.displayName} from Meta responding to: "${message}". What would you like to explore?`
            ],
            'Mistral': [
                `I'm ${model.displayName} from Mistral AI. Your message: "${message}" - I'm efficient and capable.`,
                `Hello! This is ${model.displayName} by Mistral. Regarding: "${message}" - I'm designed for performance.`,
                `Hi there! I'm ${model.displayName} from Mistral responding to: "${message}". How can I assist?`
            ],
            'xAI': [
                `I'm ${model.displayName} from xAI. You said: "${message}" - I aim to understand the universe.`,
                `Hello! This is ${model.displayName} by xAI. Your message: "${message}" - I'm designed to seek truth.`,
                `Hi! I'm ${model.displayName} from xAI responding to: "${message}". What shall we explore together?`
            ]
        };
        
        const responses = demoResponses[model.provider] || demoResponses['OpenAI'];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // FIXED FORMAT RESPONSE - Proper extraction of content from Puter.js response
    formatResponse(response) {
        console.log('Raw response:', response);
        
        if (!response) return 'No response received';
        
        // Handle string responses
        if (typeof response === 'string') {
            return response;
        }
        
        // Handle Puter.js response format - FIXED
        if (response && typeof response === 'object') {
            // Check for direct content property first
            if (response.content && typeof response.content === 'string') {
                return response.content;
            }
            
            // Check for message content (OpenAI format)
            if (response.message && response.message.content) {
                return response.message.content;
            }
            
            // Check for choices array (OpenAI format)
            if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
                const choice = response.choices[0];
                if (choice.message && choice.message.content) {
                    return choice.message.content;
                }
                if (choice.text) {
                    return choice.text;
                }
                if (choice.delta && choice.delta.content) {
                    return choice.delta.content;
                }
            }
            
            // Check for text property
            if (response.text && typeof response.text === 'string') {
                return response.text;
            }
            
            // Check for response property
            if (response.response && typeof response.response === 'string') {
                return response.response;
            }
            
            // If it's a role/content object (like your error case)
            if (response.role === 'assistant' && response.content) {
                return response.content;
            }
            
            // Try to extract any text content
            const textContent = this.extractTextFromObject(response);
            if (textContent) {
                return textContent;
            }
            
            // Fallback to JSON string with proper formatting
            console.warn('Unknown response format, falling back to JSON:', response);
            return `Response format not recognized:\n${JSON.stringify(response, null, 2)}`;
        }
        
        // Convert to string safely
        return String(response);
    }

    // Helper function to extract text from complex objects
    extractTextFromObject(obj) {
        if (!obj || typeof obj !== 'object') return null;
        
        // Look for common text properties
        const textKeys = ['content', 'text', 'message', 'response', 'answer', 'output'];
        
        for (const key of textKeys) {
            if (obj[key] && typeof obj[key] === 'string') {
                return obj[key];
            }
        }
        
        // Look deeper in nested objects
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                const nested = this.extractTextFromObject(value);
                if (nested) return nested;
            }
        }
        
        return null;
    }

    getErrorMessage(error) {
        if (error.message?.includes('401') || error.message?.includes('unauthorized')) {
            return '🔐 Authentication required. Please sign in to use AI features.';
        } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            return '⏱️ Rate limit reached. Please wait before trying again.';
        } else if (error.message?.includes('network')) {
            return '🌐 Network error. Please check your connection.';
        } else {
            return `❌ Error with ${this.models[this.currentModel].displayName}: ${error.message || 'Unknown error occurred'}`;
        }
    }

    addMessage(sender, content, files = []) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

        // SAFE CONTENT HANDLING - FIX for substring error
        let safeContent = '';
        try {
            if (content === null || content === undefined) {
                safeContent = 'Empty message';
            } else if (typeof content === 'string') {
                safeContent = content;
            } else if (typeof content === 'object') {
                safeContent = JSON.stringify(content, null, 2);
            } else {
                safeContent = String(content);
            }
        } catch (error) {
            console.error('Content conversion error:', error);
            safeContent = 'Error displaying message';
        }

        // Ensure container is visible
        chatMessages.style.display = 'flex';

        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}`;
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(20px)';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? 
            '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>' :
            '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,1 12,8H11V10A1,1 0 0,1 10,11H9V12H22V10A1,1 0 0,1 23,9V4A2,2 0 0,1 21,2H12Z"/></svg>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        // Add file attachments for user messages
        if (files && files.length > 0 && sender === 'user') {
            const filesDiv = document.createElement('div');
            filesDiv.className = 'message-files';
            files.forEach(file => {
                const fileSpan = document.createElement('span');
                fileSpan.className = 'file-attachment';
                fileSpan.textContent = `📎 ${file.name}`;
                filesDiv.appendChild(fileSpan);
            });
            messageContent.appendChild(filesDiv);
        }

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = this.formatMessageText(safeContent);

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

        // Animate message in
        requestAnimationFrame(() => {
            messageEl.style.transition = 'all 0.3s ease';
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        });
        
        // Scroll to bottom
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);

        // Update stats - SAFE CALCULATION
        if (sender === 'user') {
            this.messageHistory.push({ role: 'user', content: safeContent });
            this.messageCount++;
        } else {
            this.messageHistory.push({ role: 'assistant', content: safeContent });
        }

        // FIXED token count calculation
        const contentLength = safeContent ? safeContent.length : 0;
        this.tokenCount += contentLength;
        this.updateStats();

        // SAFE substring for logging
        const logContent = safeContent.length > 50 ? safeContent.substring(0, 50) + '...' : safeContent;
        console.log(`✅ Message added: ${sender} - "${logContent}"`);
    }

    formatMessageText(text) {
        if (!text || typeof text !== 'string') return String(text || '');
        
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 12px; margin: 8px 0;" loading="lazy">');
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
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    updateStats() {
        const messageCountEl = document.getElementById('messageCount');
        const tokenCountEl = document.getElementById('tokenCount');
        
        if (messageCountEl) {
            messageCountEl.textContent = `${this.messageCount || 0} messages`;
        }
        if (tokenCountEl) {
            tokenCountEl.textContent = `${this.tokenCount || 0} tokens`;
        }
    }

    async handleFiles(files) {
        for (const file of files) {
            if (!this.isValidFile(file)) {
                this.showToast(`Invalid file: ${file.name}`, 'error');
                continue;
            }

            try {
                this.showToast(`Processing ${file.name}...`, 'info');
                
                const fileObj = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: file.type,
                    size: this.formatFileSize(file.size),
                    file: file
                };

                if (file.type.startsWith('image/')) {
                    fileObj.url = URL.createObjectURL(file);
                } else if (file.type === 'application/pdf' || file.type === 'text/plain') {
                    try {
                        fileObj.content = await this.extractFileContent(file);
                    } catch (error) {
                        console.warn('Failed to extract file content:', error);
                        fileObj.content = `File: ${file.name}`;
                    }
                }

                this.uploadedFiles.push(fileObj);
                this.displayFiles();
                this.showToast(`${file.name} added successfully`, 'success');

            } catch (error) {
                console.error('File processing error:', error);
                this.showToast(`Failed to process ${file.name}`, 'error');
            }
        }
    }

    async extractFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    isValidFile(file) {
        const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf', 'text/plain', 'text/csv'
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

    displayFiles() {
        const container = document.getElementById('attachedFiles');
        if (!container) return;

        if (this.uploadedFiles.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        container.innerHTML = '';
        
        this.uploadedFiles.forEach(file => {
            const fileEl = document.createElement('div');
            fileEl.className = 'attached-file';
            fileEl.innerHTML = `
                <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span>${file.name}</span>
                <button class="remove-btn" onclick="sebastianLabs.removeFile('${file.id}')">×</button>
            `;
            container.appendChild(fileEl);
        });
    }

    removeFile(fileId) {
        const fileIndex = this.uploadedFiles.findIndex(f => f.id === fileId);
        if (fileIndex > -1) {
            const file = this.uploadedFiles[fileIndex];
            if (file.url && file.url.startsWith('blob:')) {
                URL.revokeObjectURL(file.url);
            }
            this.uploadedFiles.splice(fileIndex, 1);
            this.displayFiles();
            this.showToast('File removed', 'info');
        }
    }

    async generateImage() {
        const prompt = window.prompt('Enter image description:');
        if (!prompt) return;

        try {
            this.showToast('🎨 Generating image...', 'info');
            this.addMessage('user', `Generate image: ${prompt}`);
            this.showTypingIndicator();

            let result;
            if (this.isAuthenticated && typeof puter !== 'undefined' && puter.ai.txt2img) {
                result = await puter.ai.txt2img(prompt);
            } else {
                // Demo mode
                await new Promise(resolve => setTimeout(resolve, 2000));
                result = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRlbW8gSW1hZ2U8L3RleHQ+PC9zdmc+';
            }
            
            this.hideTypingIndicator();
            
            if (result) {
                let imageUrl = typeof result === 'string' ? result : result.url || result.src;
                this.addMessage('ai', `🎨 Image generated for: "${prompt}"\n\n![Generated Image](${imageUrl})`);
                this.showToast('✅ Image generated!', 'success');
            } else {
                this.addMessage('ai', '❌ Failed to generate image.');
                this.showToast('❌ Image generation failed', 'error');
            }

        } catch (error) {
            this.hideTypingIndicator();
            console.error('Image generation error:', error);
            this.addMessage('ai', '❌ Failed to generate image: ' + error.message);
            this.showToast('Error generating image', 'error');
        }
    }

    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showToast('❌ Speech recognition not supported', 'error');
            return;
        }

        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                this.showToast('🎤 Listening... Speak now', 'info');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const messageInput = document.getElementById('messageInput');
                if (messageInput) {
                    messageInput.value = transcript;
                    this.autoResizeTextarea();
                    this.updateSendButton();
                }
                this.showToast('✅ Voice input received', 'success');
            };

            recognition.onerror = (event) => {
                this.showToast(`❌ Speech recognition error: ${event.error}`, 'error');
            };

            recognition.start();

        } catch (error) {
            console.error('Voice input error:', error);
            this.showToast('❌ Failed to start voice input', 'error');
        }
    }

    clearChat() {
        if (!confirm('Clear all messages?')) return;

        const chatMessages = document.getElementById('chatMessages');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        if (welcomeMessage) {
            welcomeMessage.style.display = 'flex';
        }
        
        this.messageHistory = [];
        this.messageCount = 0;
        this.tokenCount = 0;
        this.updateStats();
        this.showToast('🧹 Chat cleared', 'info');
    }

    exportChat() {
        if (this.messageHistory.length === 0) {
            this.showToast('❌ No messages to export', 'warning');
            return;
        }

        try {
            const chatData = `SebastianLabs Chat Export\n${'='.repeat(50)}\n` +
                           `Date: ${new Date().toLocaleString()}\n` +
                           `Model: ${this.models[this.currentModel].displayName}\n` +
                           `Messages: ${this.messageCount} | Tokens: ${this.tokenCount}\n` +
                           `${'='.repeat(50)}\n\n` +
                           this.messageHistory.map(msg => 
                               `${msg.role.toUpperCase()}: ${msg.content}\n${'-'.repeat(30)}`
                           ).join('\n\n');
            
            const blob = new Blob([chatData], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `sebastianlabs-chat-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showToast('📄 Chat exported', 'success');

        } catch (error) {
            console.error('Export error:', error);
            this.showToast('❌ Export failed', 'error');
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        this.showToast(isLight ? '☀️ Light theme' : '🌙 Dark theme', 'info');
    }

    showLoading(text) {
        const overlay = document.getElementById('loadingOverlay');
        const textEl = document.getElementById('loadingText');
        
        if (overlay) overlay.classList.remove('hidden');
        if (textEl) textEl.textContent = text;
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            setTimeout(() => overlay.classList.add('hidden'), 500);
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
            error: '<path fill="currentColor" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>',
            warning: '<path fill="currentColor" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>',
            info: '<path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>'
        };
        
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                ${icons[type] || icons.info}
            </svg>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing SebastianLabs...');
    window.sebastianLabs = new SebastianLabs();
    
    // Restore theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Global error handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.sebastianLabs) {
        window.sebastianLabs.showToast('❌ An error occurred', 'error');
    }
    event.preventDefault();
});

console.log('🚀 SebastianLabs JavaScript loaded successfully!');
