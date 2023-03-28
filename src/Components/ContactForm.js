
export default function ContactForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target; //tableau inputs
        const pseudo = form[0].value;
        const email = form[1].value;
        const message = form[2].value;
        const msgUser = { pseudo, email, message };
        alert(`Pseudo : ${msgUser.pseudo} 
                E-mail : ${msgUser.email} 
                Message : ${msgUser.message}`);
    }

    return (
        <>

            <div className="mt-20 md:mt-0 relative flex py-5 items-center">
                <div className="flex-grow border-t ml-5 sm:ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-lg sm:text-2xl font-bold">Nous contacter</span>
                <div className="flex-grow border-t mr-5 sm:mr-20 border-amber-50"></div>
            </div>


            <form className="bg-stone-800 shadow-md w-full w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col sm:pb-5 sm:pt-10 m-auto mb-10 rounded-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col m-auto">
                    <label htmlFor="email" className="mt-10 mb-5 text-white text-base sm:text-lg opacity-98">Pseudonyme <span className="text-amber-300">*</span> : </label>
                    <input className="w-5/6 sm:w-full py-2 px-2 w-80 rounded-md bg-stone-100" type="text" placeholder='Votre pseudo...' required />
                </div>

                <div className="flex flex-col m-auto ">
                    <label htmlFor="date" className="mt-5 sm:mt-10 mb-5 text-white text-base sm:text-lg opacity-98">E-mail <span className="text-amber-300">*</span> :</label>
                    <input className="w-5/6 sm:w-full py-2 px-2 w-80 rounded-md bg-stone-100" type="email" placeholder='xyz@mail.com' required />
                </div>

                <div className="flex flex-col m-auto w-5/6 ">
                    <label htmlFor="date" className="mt-5 sm:mt-10 mb-5 text-white text-base sm:text-lg opacity-98">Message <span className="text-amber-300">*</span> :</label>
                    <textarea className="py-2 px-2 w-full h-48 rounded-md bg-stone-100" placeholder='Votre message...' required />
                </div>

                <p className="text-sm sm:text-xs text-center text-amber-300 pt-5">(*) champs obligatoires</p>

                <div className="flex justify-center">
                    {/* En attendant le submit du formulaire */}
                    <button type="submit" className="py-2 px-8 sm:px-8 mb-14 shadow-md shadow-stone-300/50 bg-stone-900 mt-5 sm:mt-10 rounded-md text-base sm:text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Envoyer</button>
                </div>

            </form>

        </>
    )
}
