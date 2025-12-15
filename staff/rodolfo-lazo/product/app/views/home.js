const homeView = createView()
hideView(homeView)

const homeTitle = createTitle()
setTextContent(homeTitle, 'MyPet')
addChild(homeView, homeTitle)

const homeSubtitle = createTitle2()
setTextContent(homeSubtitle, 'Welcome Home!')
addChild(homeView, homeSubtitle)

const homeTopPanel = createPanel()
setClass(homeTopPanel, 'flex justify-between')
addChild(homeView, homeTopPanel)

const homeAddPetButton = createButton()
setTextContent(homeAddPetButton, '+ Pet')
setType(homeAddPetButton, 'button')
addChild(homeTopPanel, homeAddPetButton)

homeAddPetButton.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(homeView)
    showView(addPetView)
})

const homeLogoutButton = createButton()
setTextContent(homeLogoutButton, 'Logout')
setType(homeLogoutButton, 'button')
addChild(homeTopPanel, homeLogoutButton)

homeLogoutButton.addEventListener('click', function (event) {
    event.preventDefault()

    logic.logoutUser()

    clearHomePetList()
    setTextContent(homeFeedback, '')

    hideView(homeView)
    showView(loginView)
})

const homePetList = createUnorderedList()
addChild(homeView, homePetList)
setClass(homePetList, 'flex flex-col gap-2 mt-2')

addChild(document.body, homeView)

let selectedPetId = null

const homeDeletePanel = createPanel()
hideView(homeDeletePanel)
setClass(homeDeletePanel, 'w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center')
addChild(homeView, homeDeletePanel)

const homeDeleteConfirmPanel = createPanel()
setClass(homeDeleteConfirmPanel, 'bg-white border-black border-2 p-2')

const homeDeletePanelParagraph = createParagraph()
setClass(homeDeletePanelParagraph, 'text-center')
setTextContent(homeDeletePanelParagraph, 'Delete Pet?')
addChild(homeDeleteConfirmPanel, homeDeletePanelParagraph)

const homeDeleteButtonsPanel = createPanel()
setClass(homeDeleteButtonsPanel, 'flex justify-center gap-2')

const homeDeleteCancelButton = createButton()
setTextContent(homeDeleteCancelButton, '❌')
addChild(homeDeleteButtonsPanel, homeDeleteCancelButton)

homeDeleteCancelButton.addEventListener('click', function(event) {
    event.preventDefault()

    hideView(homeDeletePanel)
})

const homeDeleteConfirmButton = createButton()
setTextContent(homeDeleteConfirmButton, '✅')
addChild(homeDeleteButtonsPanel, homeDeleteConfirmButton)

homeDeleteConfirmButton.addEventListener('click', function(event) {
    event.preventDefault()

    try {
        logic.deletePet(selectedPetId)

        clearHomePetList()
        renderHomePetList()

        hideView(homeDeletePanel)
    } catch(error) {
        setTextContent(homeFeedback, error.message)
        
        hideView(homeDeletePanel)
    }
})

addChild(homeDeleteConfirmPanel, homeDeleteButtonsPanel)

addChild(homeDeletePanel, homeDeleteConfirmPanel)

const homeFeedback = createParagraph()
addChild(homeView, homeFeedback)

// reusable functions

function renderHomePetList() {
    const pets = logic.getPets()

    for (let i = 0; i < pets.length; i++) {
        const pet = pets[i]

        const petItem = createListItem()
        setClass(petItem, 'flex items-center border-2 border-black p-2 justify-between')

        const panel = createPanel()
        setClass(panel, 'flex items-center gap-4')

        const image = createImage()
        setSource(image, pet.image)
        setClass(image, 'rounded-full w-10 h-10 object-cover')
        addChild(panel, image)

        const name = createParagraph()
        setTextContent(name, pet.name)
        addChild(panel, name)

        addChild(petItem, panel)

        const deleteButton = createButton()
        setTextContent(deleteButton, '🗑️')
        addClass(deleteButton, 'justify-self-end')
        addChild(petItem, deleteButton)

        deleteButton.addEventListener('click', function(event) {
            event.preventDefault()

            selectedPetId = pet.id

            showView(homeDeletePanel)
        })

        addChild(homePetList, petItem)
    }
}

function clearHomePetList() {
    for (let i = homePetList.children.length - 1; i >= 0; i--) {
        const child = homePetList.children[i]

        removeChild(homePetList, child)
    }
}