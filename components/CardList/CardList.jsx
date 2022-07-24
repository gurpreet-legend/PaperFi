import React from 'react'
import Card from './Card'

const CardList = () => {
    return (
        <div>
            <ul className="flex w-full m-auto mb-6 flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {/* inactive */}
                <li className="mr-2">
                    <div className="inline-block cursor-pointer py-3 px-4 text-white bg-blue-600 rounded-lg active" aria-current="page">Tab 1</div>
                </li>
                {/* active  */}
                <li className="mr-2">
                    <div className="inline-block cursor-pointer py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Tab 2</div>
                </li>
            </ul>
            <div className='grid grid-cols-4 gap-6'>
                <Card
                    title="title"
                    author="author"
                    owner="owner"
                    category="category"
                    timestamp="Published on 12 Feb 2022"
                    description="description"
                    imageURL="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />
                <Card
                    title="title"
                    author="author"
                    owner="owner"
                    category="category"
                    timestamp="Published on 12 Feb 2022"
                    description="description"
                    imageURL="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />
                <Card
                    title="title"
                    author="author"
                    owner="owner"
                    category="category"
                    timestamp="Published on 12 Feb 2022"
                    description="description"
                    imageURL="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />
                <Card
                    title="title"
                    author="author"
                    owner="owner"
                    category="category"
                    timestamp="Published on 12 Feb 2022"
                    description="description"
                    imageURL="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />
                <Card
                    title="title"
                    author="author"
                    owner="owner"
                    category="category"
                    timestamp="Published on 12 Feb 2022"
                    description="description"
                    imageURL="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />
                <Card
                    title="title"
                    author="author"
                    owner="owner"
                    category="category"
                    timestamp="Published on 12 Feb 2022"
                    description="description"
                    imageURL="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                />
            </div>
        </div>
    )
}

export default CardList