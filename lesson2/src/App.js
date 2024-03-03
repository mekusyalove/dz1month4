import React from "react"


const user = {
    name: 'stich',
    image: 'https://flomaster.top/o/uploads/posts/2023-11/1700211753_flomaster-top-p-sinii-multyashnii-personazh-risunki-vkonta-1.png',
    info: 'Стич — придуманный инопланетянин, изначально созданный чтобы создавать большой хаос в галактике и разных городах. Отличается исключительной вспыльчивостью',
    imgSize: 180
}
const users = {
    name: 'Hedy Lamarr',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Hedy_Lamarr_in_The_Heavenly_Body_1944.jpg/411px-Hedy_Lamarr_in_The_Heavenly_Body_1944.jpg',
    info: 'Хеди Ламарр (урожденная Хедвиг Ева Мария Кислер; 9 ноября 1914, Вена, Австро-Венгрия — 19 января 2000, Кэсселберри, Флорида, США) — австрийская и американская актриса и изобретательница. Её пик популярности пришелся на 1930—1940 года, Золотую эпоху Голливуда.',
    imgSize: 180
}
export default function App () {
    return (
        <div>
            <h1>{user.name}</h1>
            <img src={user.image} alt={'photo' + user.name} style={{width: user.imgSize, height: user.imgSize}}/>
            <p>{user.info}</p>
            <div className="hedy">
                <h2>{users.name}</h2>
                <img src={users.image} alt={'photo' + users.name} style={{width: users.imgSize, height: user.imgSize}} />
                <p>{users.info}</p>
            </div>
        </div>
    )
}