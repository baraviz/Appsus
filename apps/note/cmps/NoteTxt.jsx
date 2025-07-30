export function NoteTxt({info, isPinned, style}){


    return (
        <section className="note-txt" style={style}>
            <h1>Title</h1>
            <p>{info.txt}</p>
        </section>
    )
}