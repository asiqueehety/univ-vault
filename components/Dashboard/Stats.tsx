'use client'
export default function Stats(){
    return(
        <div>
            <h1 className="flex justify-center bg-white/10 rounded-xl m-1">Edit</h1>
            <div className="flex flex-row flex-wrap *:m-1">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Username</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Email</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Phone</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Institution</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Department</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Batch</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_2')?.showModal()}>Password</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                

            </div>
        </div>
    );
}