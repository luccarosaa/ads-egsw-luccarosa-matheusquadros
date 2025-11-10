document.addEventListener('DOMContentLoaded', () => {

    let isExistingUser = false;
    let postType = 'meal';

    const svgIcons = {
        home: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
        add: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
        profile: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        suggestions: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
        groups: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V18c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
        search: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
        notifications: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`,
        heart_outline: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>`,
        heart_filled: `<svg fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`,
        comment: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path></svg>`
    };

    const loadIcons = () => {
        // Nav Inferior
        document.getElementById('icon-home').innerHTML = svgIcons.home;
        document.getElementById('icon-suggestions-new').innerHTML = svgIcons.suggestions;
        document.getElementById('icon-add').innerHTML = svgIcons.add;
        document.getElementById('icon-groups').innerHTML = svgIcons.groups;
        document.getElementById('icon-profile').innerHTML = svgIcons.profile;
        // Nav Superior
        document.getElementById('icon-search').innerHTML = svgIcons.search;
        document.getElementById('icon-notifications').innerHTML = svgIcons.notifications;
    };

    // DADOS DO USUÁRIO ATUALIZADOS
    let currentUser = {
        username: '@visitante',
        profilePic: 'https://i.imgur.com/lOsEl90.png',
        goal: 'Emagrecimento',
        // Novos campos
        gender: 'male',
        age: 0,
        height: 0,
        weight: 0,
        activity: 1.2,
        tdee: 0,
        calorieTarget: 0,
        // Fim dos novos campos
        streak: 0,
        postCount: 0,
        followers: 0,
        following: 0
    };

    // DADOS DOS POSTS ATUALIZADOS (sem score, com streak)
    let posts = [
        { id: 2, username: '@rodrigo_lima', avatar: 'https://i.pravatar.cc/80?u=rodrigo_lima', streak: 9, image: 'https://i.imgur.com/tfr3IhP.jpg', caption: 'Café da manhã reforçado para começar o dia!', likes: 142, comments: [] },
        { id: 1, username: '@ana.souza', avatar: 'https://i.pravatar.cc/80?u=ana.souza', streak: 3, image: 'https://i.imgur.com/u41Si2o.jpg', caption: 'Almoço de hoje: simples e delicioso.', likes: 123, comments: [
            { id: 1001, username: '@bruno.g', text: 'Parece ótimo!', likes: 2 }
        ]}
    ];

    let stories = [
        { id: 101, username: '@ana.souza', avatar: 'https://i.pravatar.cc/80?u=ana.souza', image: 'https://i.imgur.com/O49vJvD.jpg' },
        { id: 102, username: '@rodrigo_lima', avatar: 'https://i.pravatar.cc/80?u=rodrigo_lima', image: 'https://i.imgur.com/3qP3R8F.jpg' },
    ];

    const screens = document.querySelectorAll('.screen');
    const showScreen = (screenId) => {
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(screenId)?.classList.add('active');
    };

    document.getElementById('nextOnboardingBtn').addEventListener('click', () => showScreen('onboarding-2'));
    document.getElementById('skipIntroBtn').addEventListener('click', () => showScreen('login-screen'));
    document.getElementById('startBtn').addEventListener('click', () => showScreen('login-screen'));
    document.getElementById('showRegister').addEventListener('click', (e) => { e.preventDefault(); showScreen('register-screen'); });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        currentUser.username = username ? `@${username}` : '@sem_nome';
        // Zera as stats ao registrar
        currentUser.streak = 0;
        currentUser.postCount = 0;
        currentUser.followers = 0;
        currentUser.following = 0;
        showScreen('goal-screen');
    });

    document.querySelectorAll('.goal-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.goal-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentUser.goal = button.dataset.goal;
        });
    });

    document.getElementById('goalContinueBtn').addEventListener('click', () => {
        if (!currentUser.goal) {
            alert('Por favor, selecione um objetivo.');
            return;
        }
        if (isExistingUser) {
            updateUserInfoUI();
            showScreen('main-app-screen');
            switchView('suggestions-view');
        } else {
            // ALTERAÇÃO AQUI: Vai para a tela de dados calóricos
            showScreen('caloric-data-screen');
        }
    });

    document.getElementById('changeGoalSuggestionsBtn').addEventListener('click', () => showScreen('goal-screen'));
    document.getElementById('changeGoalProfileBtn').addEventListener('click', () => showScreen('goal-screen'));

    const profilePicInput = document.getElementById('profilePicInput');
    document.getElementById('chooseProfilePicBtn').addEventListener('click', () => profilePicInput.click());
    document.getElementById('profilePicPreview').addEventListener('click', () => profilePicInput.click());
    profilePicInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentUser.profilePic = e.target.result;
                document.getElementById('profilePicPreview').src = e.target.result;
                // ALTERAÇÃO AQUI: Vai para a tela de boas-vindas
                populateWelcomeScreen();
                showScreen('welcome-screen');
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('skipProfilePicBtn').addEventListener('click', () => {
        currentUser.profilePic = 'https://i.imgur.com/lOsEl90.png';
        // ALTERAÇÃO AQUI: Vai para a tela de boas-vindas
        populateWelcomeScreen();
        showScreen('welcome-screen');
    });

    const startApp = () => {
        isExistingUser = true;
        updateUserInfoUI();
        renderFeed();
        showScreen('main-app-screen');
        switchView('feed-view');
    };

    // FUNÇÃO DE ATUALIZAR UI ATUALIZADA
    const updateUserInfoUI = () => {
        const goalMap = { 'Emagrecimento': 'Emagrecimento', 'massa': 'Ganho de Massa', 'definir': 'Manutenção calórica' };

        // ATUALIZA INFO DA PÁGINA DE PERFIL
        document.getElementById('profilePageUsername').textContent = currentUser.username;
        document.getElementById('profilePagePic').src = currentUser.profilePic;
        document.getElementById('profilePageGoal').textContent = goalMap[currentUser.goal] || 'Não definido';
        // Novas Stats
        document.getElementById('profilePostsCount').textContent = currentUser.postCount;
        document.getElementById('profileFollowersCount').textContent = currentUser.followers; // Mock
        document.getElementById('profileFollowingCount').textContent = currentUser.following; // Mock
    };

    const photoOptionsModal = document.getElementById('photoOptionsModal');
    const addPostModal = document.getElementById('addPostModal');
    const photoOptionsTitle = photoOptionsModal.querySelector('h3');

    const openPhotoModal = () => {
        photoOptionsTitle.textContent = postType === 'meal' ? 'Adicionar Refeição' : 'Adicionar Story';
        photoOptionsModal.style.display = 'flex';
    }
    const closePhotoModal = () => photoOptionsModal.style.display = 'none';

    const toggleAddPostModal = () => {
        const display = addPostModal.style.display === 'block' ? 'none' : 'block';
        addPostModal.style.display = display;
    }

    document.getElementById('takePhotoBtn').addEventListener('click', () => document.getElementById('takePhotoInput').click());
    document.getElementById('chooseGalleryBtn').addEventListener('click', () => document.getElementById('galleryInput').click());
    document.getElementById('closeModalBtn').addEventListener('click', closePhotoModal);

    document.getElementById('addMealBtn').addEventListener('click', () => {
        postType = 'meal';
        toggleAddPostModal();
        openPhotoModal();
    });
    document.getElementById('addStoryBtn').addEventListener('click', () => {
        postType = 'story';
        toggleAddPostModal();
        openPhotoModal();
    });

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('createPostPreview').src = e.target.result;
                document.getElementById('createPostTitle').textContent = postType === 'meal' ? 'Nova Refeição' : 'Novo Story';
                showScreen('create-post-screen');
                closePhotoModal();
            };
            reader.readAsDataURL(file);
        }
    };
    document.getElementById('takePhotoInput').addEventListener('change', handleFileSelect);
    document.getElementById('galleryInput').addEventListener('change', handleFileSelect);

    // FUNÇÃO DE PUBLICAÇÃO ATUALIZADA
    document.getElementById('publishPostBtn').addEventListener('click', () => {
        const imageUrl = document.getElementById('createPostPreview').src;
        const caption = document.getElementById('postCaption').value || '';

        if (postType === 'meal') {
            // Incrementa streak e post count ANTES de criar o post
            currentUser.streak++;
            currentUser.postCount++;

            const newPost = {
                id: Date.now(),
                username: currentUser.username,
                avatar: currentUser.profilePic,
                streak: currentUser.streak, // Usa a streak atualizada do usuário
                image: imageUrl,
                caption: caption || 'Refeição deliciosa! 😋',
                likes: 0,
                comments: []
            };
            posts.unshift(newPost);
            updateUserInfoUI(); // Atualiza a UI com os novos contadores

        } else {
            // Publica como STORY
            const newStory = {
                id: Date.now(),
                username: currentUser.username,
                avatar: currentUser.profilePic,
                image: imageUrl,
            };
            stories.unshift(newStory);
            // Publicar story não incrementa streak nem post count (decisão de design)
        }

        renderFeed();
        showScreen('main-app-screen');
        switchView('feed-view');
        document.getElementById('postCaption').value = '';
    });

    // FUNÇÃO DE CRIAR ELEMENTO DO POST ATUALIZADA
    const createPostElement = (post) => {
        const postEl = document.createElement('article');
        postEl.className = 'feed-post';

        const commentsHtml = (post.comments || []).map(comment => `
            <div class="comment-item" data-comment-id="${comment.id}">
                <span class="comment-user">${comment.username}</span>
                <span class="comment-text">${comment.text}</span>
                <div class="comment-like">
                    <span class="comment-like-btn">${svgIcons.heart_outline}</span>
                    <span class="comment-like-count">${comment.likes}</span>
                </div>
            </div>
        `).join('');

        // Formata o número da streak
        const formattedStreak = String(post.streak).padStart(2, '0');

        postEl.innerHTML = `
            <div class="post-header">
                <div class="post-user"><img src="${post.avatar}" alt="Avatar"><div><div class="username">${post.username}</div></div></div>
                <div class="post-streak"><span>${formattedStreak}</span></div>
            </div>
            <img src="${post.image}" alt="Foto da refeição" class="post-image">
            <div class="post-footer">
                <div class="post-interactions">
                    <span class="interaction-icon like-btn">${svgIcons.heart_outline}</span>
                    <span class="interaction-icon comment-btn">${svgIcons.comment}</span>
                </div>
                <p class="post-likes">${post.likes} curtidas</p>
                <p class="post-caption"><span class="username">${post.username}</span> ${post.caption}</p>
                <div class="post-comments-container">${commentsHtml}</div>
                <p class="add-comment-link">Adicionar um comentário...</p>
            </div>`;

        const likeBtn = postEl.querySelector('.like-btn');
        const postLikesEl = postEl.querySelector('.post-likes');

        const toggleLike = () => {
            const postData = posts.find(p => p.id === post.id);
            if (!postData) return;
            const liked = likeBtn.classList.toggle('liked');
            if (liked) {
                postData.likes++;
                likeBtn.innerHTML = svgIcons.heart_filled;
            } else {
                postData.likes--;
                likeBtn.innerHTML = svgIcons.heart_outline;
            }
            postLikesEl.textContent = `${postData.likes} curtidas`;
        };

        postEl.querySelector('.post-image').addEventListener('dblclick', () => {
            if (!likeBtn.classList.contains('liked')) {
                toggleLike();
            }
        });
        likeBtn.addEventListener('click', toggleLike);

        postEl.querySelector('.add-comment-link').addEventListener('click', () => {
            const commentText = prompt('Adicione um comentário:');
            if (commentText) {
                const newComment = { id: Date.now(), username: currentUser.username, text: commentText, likes: 0 };
                const postData = posts.find(p => p.id === post.id);
                if (postData) {
                    postData.comments.push(newComment);
                    renderFeed();
                }
            }
        });

        postEl.querySelectorAll('.comment-like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const commentItem = btn.closest('.comment-item');
                const commentId = Number(commentItem.dataset.commentId);
                const postData = posts.find(p => p.id === post.id);
                const commentData = postData.comments.find(c => c.id === commentId);

                if (commentData) {
                    const liked = btn.classList.toggle('liked');
                    if (liked) {
                        commentData.likes++;
                        btn.innerHTML = svgIcons.heart_filled;
                    } else {
                        commentData.likes--;
                        btn.innerHTML = svgIcons.heart_outline;
                    }
                    commentItem.querySelector('.comment-like-count').textContent = commentData.likes;
                }
            });
        });

        return postEl;
    };

    const storyViewScreen = document.getElementById('story-view-screen');
    const storyViewImage = document.getElementById('story-view-image');
    document.getElementById('close-story-btn').addEventListener('click', () => {
        storyViewScreen.classList.remove('active');
    });

    const showStoryView = (story) => {
        storyViewImage.src = story.image;
        storyViewScreen.classList.add('active');
    }

    const renderStories = (container) => {
        const storiesBar = document.createElement('section');
        storiesBar.className = 'stories-bar';

        const myStoryBubble = document.createElement('div');
        myStoryBubble.className = 'story-bubble';
        myStoryBubble.innerHTML = `
            <div class="story-img-wrapper">
                <img src="${currentUser.profilePic}" alt="Seu Story" class="story-img">
            </div>
            <span class="story-username">Seu Story</span>
        `;
        myStoryBubble.addEventListener('click', () => {
            postType = 'story';
            openPhotoModal();
        });
        storiesBar.appendChild(myStoryBubble);

        stories.forEach(story => {
            if (story.username === currentUser.username) return;

            const bubble = document.createElement('div');
            bubble.className = 'story-bubble';
            bubble.innerHTML = `
                <div class="story-img-wrapper">
                    <img src="${story.avatar}" alt="${story.username}" class="story-img">
                </div>
                <span class="story-username">${story.username}</span>
            `;
            bubble.addEventListener('click', () => showStoryView(story));
            storiesBar.appendChild(bubble);
        });

        container.appendChild(storiesBar);
    }

    const renderFeed = () => {
        const feedContainer = document.getElementById('feed-view');
        const userHistoryContainer = document.getElementById('user-posts-history');
        feedContainer.innerHTML = '';
        userHistoryContainer.innerHTML = '';

        renderStories(feedContainer);

        const myPosts = posts.filter(p => p.username === currentUser.username);

        if (posts.length === 0) {
            const noFeed = document.createElement('p');
            noFeed.textContent = 'Seu feed está vazio.';
            noFeed.style = 'text-align:center; padding: 20px;';
            feedContainer.appendChild(noFeed);
        }
        if (myPosts.length === 0) userHistoryContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Você ainda não postou nada.</p>';

        posts.forEach(post => feedContainer.appendChild(createPostElement(post)));
        myPosts.forEach(post => userHistoryContainer.appendChild(createPostElement(post)));
    };

    const contentViews = document.querySelectorAll('.content-view');
    const bottomNavIcons = document.querySelectorAll('.bottom-nav .nav-icon');

    const switchView = (targetId) => {
        addPostModal.style.display = 'none';

        contentViews.forEach(v => v.classList.remove('active'));
        document.getElementById(targetId)?.classList.add('active');
        bottomNavIcons.forEach(i => i.classList.toggle('active', i.dataset.target === targetId));

        // --- (NOVO) CÓDIGO PARA RESETAR A ABA GRUPOS ---
        if (targetId === 'groups-view') {
            showGroupSubView('groups-initial-view');
            resetJoinGroupView();
        }
        // --- FIM DO NOVO CÓDIGO ---

        if (targetId === 'suggestions-view') {
            document.querySelectorAll('.suggestion-group').forEach(sg => sg.style.display = 'none');
            const targetSuggestion = `sugestao-${currentUser.goal}`;
            const suggestionEl = document.getElementById(targetSuggestion);
            if (suggestionEl) {
                suggestionEl.style.display = 'block';
            }
        }
    };

    bottomNavIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const target = icon.dataset.target;
            if (target === 'add-post-action') {
                toggleAddPostModal();
            } else {
                switchView(target);
            }
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Simula um login com dados ATUALIZADOS
        currentUser = {
            username: '@teste_login',
            profilePic: 'https://i.pravatar.cc/80',
            goal: 'Emagrecimento',
            // Simula dados calóricos para um usuário existente
            gender: 'male', age: 30, height: 180, weight: 80, activity: 1.55,
            tdee: 2638, // Exemplo, recalcularia na prática
            calorieTarget: 2138, // Exemplo
            // Fim dados calóricos
            streak: 5,
            postCount: 1,
            followers: 125,
            following: 50
        };
        posts.push({
            id: 3, username: '@teste_login', avatar: 'https://i.pravatar.cc/80', streak: 5,
            image: 'https://i.imgur.com/8mB6hXW.jpg', caption: 'Acabei de entrar!', likes: 12, comments: []
        });
        startApp();
    });



    // === LÓGICA DA ABA GRUPOS ===

    // Cache dos elementos da aba Grupos
    const groupsView = document.getElementById('groups-view');
    const groupSubViews = groupsView.querySelectorAll('.group-sub-view');
    const btnShowCreateGroup = document.getElementById('btn-show-create-group');
    const btnShowJoinGroup = document.getElementById('btn-show-join-group');
    const btnsBackToGroups = groupsView.querySelectorAll('.btn-back-to-groups');
    const btnShowBusiness = document.getElementById('btn-show-business'); // NOVO BOTÃO

    // Elementos do Fluxo "Entrar"
    const joinForm = document.getElementById('groups-join-form');
    const btnJoinSearch = document.getElementById('btn-join-search');
    const joinResult = document.getElementById('groups-join-result');
    const btnRequestPermission = document.getElementById('btn-request-permission');
    const joinStatus = document.getElementById('groups-join-status');

    // Função para trocar as sub-telas (Inicial, Criar, Entrar)
    const showGroupSubView = (viewId) => {
        groupSubViews.forEach(v => v.classList.remove('active'));
        document.getElementById(viewId)?.classList.add('active');
    }

    // Função para resetar o fluxo de "Entrar no Grupo"
    const resetJoinGroupView = () => {
        joinForm.style.display = 'block';
        joinResult.style.display = 'none';
        joinStatus.style.display = 'none';
        document.getElementById('group-key').value = ''; // Limpa o campo
    }

    // Navegação principal da aba
    btnShowCreateGroup.addEventListener('click', () => showGroupSubView('groups-create-view'));

    btnShowJoinGroup.addEventListener('click', () => {
        resetJoinGroupView(); // Garante que o fluxo está resetado ao entrar
        showGroupSubView('groups-join-view');
    });

    btnsBackToGroups.forEach(btn => {
        btn.addEventListener('click', () => showGroupSubView('groups-initial-view'));
    });

    // (NOVO) Listener para o botão Business
    btnShowBusiness.addEventListener('click', () => {
        showScreen('business-screen');
    });


    // Simulação de "Entrar no Grupo" (Fluxo Fictício)
    btnJoinSearch.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o envio do formulário
        // Esconde o form e mostra o resultado fictício
        joinForm.style.display = 'none';
        joinResult.style.display = 'block';
        joinStatus.style.display = 'none';
    });

    btnRequestPermission.addEventListener('click', () => {
        // Esconde o resultado e mostra o status final
        joinForm.style.display = 'none';
        joinResult.style.display = 'none';
        joinStatus.style.display = 'block';
    });

    // === FIM DA LÓGICA DE GRUPOS ===

    // === LÓGICA DE CÁLCULO CALÓRICO ===

    const calculateTMB = () => {
        const { gender, age, height, weight } = currentUser;
        if (gender === 'male') {
            // Homens: 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            // Mulheres: 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade)
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    };

    const calculateTDEE = (tmb) => {
        // Resultado 1: Gasto Calórico Atual (TDEE)
        const tdee = tmb * currentUser.activity;
        return Math.round(tdee);
    };

    const calculateTarget = (tdee) => {
        // Resultado 2: Meta Calórica Diária
        switch (currentUser.goal) {
            case 'Emagrecimento':
                return tdee - 500;
            case 'massa':
                return tdee + 500;
            case 'definir':
            default:
                return tdee;
        }
    };

    const populateWelcomeScreen = () => {
        const goalMap = { 'Emagrecimento': 'Emagrecimento', 'massa': 'Ganho de Massa', 'definir': 'Manutenção' };

        document.getElementById('welcome-username').textContent = currentUser.username;
        document.getElementById('welcome-goal').textContent = goalMap[currentUser.goal] || 'seu objetivo';
        document.getElementById('welcome-tdee').textContent = currentUser.tdee;
        document.getElementById('welcome-target').textContent = currentUser.calorieTarget;
    };

    // Listener para a nova tela de dados calóricos
    document.getElementById('caloricDataBtn').addEventListener('click', () => {
        // 1. Coletar dados do formulário
        currentUser.gender = document.getElementById('user-gender').value;
        currentUser.age = parseFloat(document.getElementById('user-age').value) || 0;
        currentUser.height = parseFloat(document.getElementById('user-height').value) || 0;
        currentUser.weight = parseFloat(document.getElementById('user-weight').value) || 0;
        currentUser.activity = parseFloat(document.getElementById('user-activity').value) || 1.2;

        // Validação básica (adicionar se necessário)
        if (currentUser.age <= 0 || currentUser.height <= 0 || currentUser.weight <= 0) {
            alert('Por favor, preencha todos os dados com valores válidos.');
            return;
        }


        // 2. Realizar Cálculos
        const tmb = calculateTMB();
        currentUser.tdee = calculateTDEE(tmb);
        currentUser.calorieTarget = calculateTarget(currentUser.tdee);

        // 3. Navegar para a próxima tela (Foto de Perfil)
        showScreen('profile-pic-screen');
    });

    // Listener para o botão final "Começar" na tela de boas-vindas
    document.getElementById('welcomeStartBtn').addEventListener('click', () => {
        startApp(); // Agora o startApp é chamado AQUI.
    });

    // === FIM DA LÓGICA CALÓRICA ===

    // === NAVEGAÇÃO PREMIUM & BUSINESS ===

    // Listener no botão "Assinar Premium" do perfil
    document.getElementById('btn-premium-profile').addEventListener('click', () => {
        showScreen('premium-screen'); // Mostra a tela premium
    });

    // Listener no botão "X" (fechar) da tela premium
    document.getElementById('close-premium-btn').addEventListener('click', () => {
        // Volta para a tela principal E ativa a aba de perfil
        showScreen('main-app-screen');
        switchView('profile-view');
    });

    // Listener para o botão de assinatura final (ação futura)
    document.getElementById('btn-subscribe-premium').addEventListener('click', () => {
        alert('Funcionalidade de assinatura ainda não implementada.');
        // Aqui você adicionaria a lógica de pagamento ou confirmação
    });

    // (NOVO) Listener no botão "X" (fechar) da tela business
    document.getElementById('close-business-btn').addEventListener('click', () => {
        // Volta para a tela principal E ativa a aba de grupos
        showScreen('main-app-screen');
        switchView('groups-view');
    });

    // (NOVO) Listeners para os botões finais da tela business
    document.getElementById('btn-register-business').addEventListener('click', () => {
        alert('Funcionalidade de cadastro de empresa ainda não implementada.');
    });
    document.getElementById('btn-login-business').addEventListener('click', () => {
        alert('Funcionalidade de login de empresa ainda não implementada.');
    });

    // === FIM DA NAVEGAÇÃO PREMIUM & BUSINESS ===


    loadIcons();
    renderFeed();

});