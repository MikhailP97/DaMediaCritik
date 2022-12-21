export default function NotFound() {
  return (
    <>
    <div className="flex flex-col py-20 ">
    <img className=" w-3/12 m-auto pb-10" alt="404 : Pag not found" src="https://img.buzzfeed.com/buzzfeed-static/static/2016-02/1/11/enhanced/webdr07/anigif_enhanced-21255-1454345675-2.gif"/>
        <div>
    <p className="text-9xl text-amber-100 font-black pb-10 text-center ">O<span className="text-amber-400">u</span>p<span className="text-amber-400">s</span>!</p>   
    <p className="text-3xl text-amber-50 font-bold pt-10 text-center ">La page que vous recherchez semble introuvable <span className="text-amber-200">:<span className="text-amber-400">(</span></span></p>
    <p className="text-2xl text-amber-50 font-bold pt-10 text-center">Code erreur : 404.</p>
    </div>

  
    </div>
    </>
  )
}
