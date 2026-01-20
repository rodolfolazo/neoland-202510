const { useState, useEffect } = React

function Home({ onGoToAddPet, onGoToLogin }) {
    console.log('Home -> call')

    const [message, setMessage] = useState('')
    const [pets, setPets] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        console.log('Home -> useEffect')

        try {
            const pets = logic.getPets()

            setPets(pets)
        } catch (error) {
            setMessage(error.message)
        }
    }, [])

    const handleDeletePetClick = event => {
        event.preventDefault()

        const button = event.target

        const petId = button.id

        setPetId(petId)
    }

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setMessage('')
            setPets([])

            onGoToLogin()
        } catch (error) {
            setMessage('sorry, there was an error on logout, please, try it later')
        }
    }

    const handleCancelDeletePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    const handleConfirmDeletePetClick = event => {
        event.preventDefault()

        try {
            logic.deletePet(petId)

            const pets = logic.getPets()

            setPetId(null)
            setPets(pets)
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('Home -> render')

    const petItems = []

    for (const pet of pets) {
        const petItem = <li className="flex items-center border-2 border-black p-2 justify-between">
            <div className="flex items-center gap-4">
                <img src={pet.image} className="rounded-full w-10 h-10 object-cover" />

                <p>{pet.name}</p>
            </div>
            <button id={pet.id} className="bg-black text-white px-1 justify-self-end" onClick={handleDeletePetClick}>🗑️</button>
        </li>

        petItems.push(petItem)
    }

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Welcome Home!</h2>

        <div className="flex justify-between">
            <button className="bg-black text-white px-1" type="button" onClick={handleAddPetClick}>+ Pet</button>
            <button className="bg-black text-white px-1" type="button" onClick={handleLogoutClick}>Logout</button>
        </div>

        <ul className="flex flex-col gap-2 mt-2">
            {petItems}
        </ul>

        {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-white border-black border-2 p-2">
                <p className="text-center">Delete Pet?</p>

                <div className="flex justify-center gap-2">
                    <button className="bg-black text-white px-1" onClick={handleCancelDeletePetClick}>❌</button> <button className="bg-black text-white px-1" onClick={handleConfirmDeletePetClick}>✅</button>
                </div>
            </div>
        </div>}

        <p>{message}</p>
    </div>
} 