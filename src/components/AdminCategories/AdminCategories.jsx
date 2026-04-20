import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminCategories.css'

function AdminCategories() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const res = await axios.get(
            'https://localhost:7266/api/categories'
        )

        setCategories(res.data)
    }

    const saveCategory = async () => {

        if (editId) {
            await axios.put(
                `https://localhost:7266/api/categories/${editId}`,
                { name }
            )
        } else {
            await axios.post(
                'https://localhost:7266/api/categories',
                { name }
            )
        }

        setName('')
        setEditId(null)
        loadCategories()
    }

    const editCategory = (cat) => {
        setEditId(cat.id)
        setName(cat.name)
    }

    const removeCategory = async (id) => {
        await axios.delete(
            `https://localhost:7266/api/categories/${id}`
        )

        loadCategories()
    }

    return (
        <div className="admin-categories">

            <h2>Категорії</h2>

            <div className="cat-form">

                <input
                    placeholder="Назва категорії"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <button
                    className="btn btn-warning"
                    onClick={saveCategory}
                >
                    {editId
                        ? 'Зберегти'
                        : 'Додати'}
                </button>

            </div>

            <table className="admin-table">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>

                {categories.map(cat => (
                    <tr key={cat.id}>

                        <td>{cat.id}</td>
                        <td>{cat.name}</td>

                        <td>

                            <button
                                className="btn btn-sm btn-outline-light me-2"
                                onClick={() =>
                                    editCategory(cat)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                    removeCategory(cat.id)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    )
}

export default AdminCategories