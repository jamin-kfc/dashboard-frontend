type SearchProps = {
    cardCode: string
    sDate: string
    eDate: string
    setCardCode: (value: string) => void
    setSDate: (value: string) => void
    setEDate: (value: string) => void
    setIsSearched: (value: boolean) => void
}

export default function Search({cardCode, sDate, eDate, setCardCode, setSDate, setEDate, setIsSearched}: SearchProps) {
    function search(formData: FormData) {
        setCardCode((formData.get('CardCode') as string | null)?.trim() || '');
        setSDate((formData.get('startDate') as string | null)?.trim() || '');
        setEDate((formData.get('endDate') as string | null)?.trim() || '');
        setIsSearched(true);
    }

    return (
        <form action={search}>
            <label>Card Code:
                <input name='CardCode' value={cardCode} placeholder='Enter Card Code' onChange={e => setCardCode(e.target.value)}/>
            </label>
            <label>From:
                <input name='startDate' value={sDate} placeholder='yyyy-mm-dd' onChange={e => setSDate(e.target.value)}/>
            </label>
            <label>To:
            <input name='endDate' value={eDate} placeholder='yyyy-mm-dd' onChange={e => setEDate(e.target.value)}/>
            </label>
            <button type="submit">Search</button>
        </form>
    )
}