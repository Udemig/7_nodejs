import '../styles/Loader.css'

const Loader = () => {


    return (
        <div className="my-10">
            <div role="status" className="flex max-w-[500px] mx-auto py-10 rounded-xl justify-center bg-gray-400">
                <div class="wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="shadow-anim"></div>
                    <div class="shadow-anim"></div>
                    <div class="shadow-anim"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;