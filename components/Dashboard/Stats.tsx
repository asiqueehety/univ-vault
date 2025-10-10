'use client'
import { useState } from "react";
export default function Stats(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [institution, setInstitution] = useState('');
    const [dept, setDept] = useState('');
    const [batch, setBatch] = useState('');
    const [password, setPassword] = useState('');

    async function changeName(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('/api/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();
        const response = await fetch('/api/update/user/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: user.user_id, // Replace with actual user ID
                updated_name: name
            }),
        });
        const data = await response.json();
        if(data.error){
            alert("Error updating name: " + data.error);
        }
    }
    async function changeEmail(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('/api/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();
        const response = await fetch('/api/update/user/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: user.user_id, // Replace with actual user ID
                updated_email: email
            }),
        });
        const data = await response.json();
        if(data.error){
            alert("Error updating email: " + data.error);
        }
    }
    async function changePhone(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('/api/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();
        const response = await fetch('/api/update/user/phone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: user.user_id, // Replace with actual user ID
                updated_phone: phone
            }),
        });
        const data = await response.json();
        if(data.error){
            alert("Error updating phone: " + data.error);
        }
    }
    async function changeBatch(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('/api/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();
        const response = await fetch('/api/update/user/batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: user.user_id, // Replace with actual user ID
                updated_batch: batch
            }),
        });
        const data = await response.json();
        if(data.error){
            alert("Error updating batch: " + data.error);
        }
    }
    async function changeDept(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('/api/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();
        const response = await fetch('/api/update/user/dept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: user.user_id, // Replace with actual user ID
                updated_dept: dept
            }),
        });
        const data = await response.json();
        if(data.error){
            alert("Error updating department: " + data.error);
        }
    }    
    async function changeInstitution(){
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in or token missing.");
            return;
        }
        const userFetch =await fetch('/api/getCurrentUser',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const user = await userFetch.json();
        const response = await fetch('/api/update/user/institution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: user.user_id, // Replace with actual user ID
                updated_institution: institution
            }),
        });
        const data = await response.json();
        if(data.error){
            alert("Error updating email: " + data.error);
        }
    }
    async function changePassword(){

    }
    return(
        <div>
            <h1 className="flex justify-center bg-white/10 rounded-xl m-1">Edit</h1>
            <div className="flex flex-row flex-wrap *:m-1">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_1')?.showModal()}>Username</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <form>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Input new name</legend>
                                    <input type="email" className="input" placeholder="Type here" onChange={(e)=>{setName(e.target.value);}}/> 
                                </fieldset> 
                                <button className="btn btn-accent" onClick={()=>{changeName()}}>Change</button>
                            </form>
                            <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
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
                            <form>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Input new email address</legend>
                                    <input type="email" className="input" placeholder="Type here" onChange={(e)=>{setEmail(e.target.value);}}/> 
                                </fieldset> 
                                <button className="btn btn-accent" onClick={()=>{changeEmail()}}>Change</button>
                            </form>
                            <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_3')?.showModal()}>Phone</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Input new phone number</legend>
                                    <input type="number" className="input" placeholder="Type here" onChange={(e)=>{setPhone(e.target.value);}}/> 
                                </fieldset> 
                                <button className="btn btn-accent" onClick={()=>{changePhone()}}>Change</button>
                            </form>
                            <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_4')?.showModal()}>Institution</button>
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box">
                            <form>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Input new institution</legend>
                                    <input type="email" className="input" placeholder="Type here" onChange={(e)=>{setInstitution(e.target.value);}}/> 
                                </fieldset> 
                                <button className="btn btn-accent" onClick={()=>{changeInstitution()}}>Change</button>
                            </form>
                            <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_5')?.showModal()}>Department</button>
                    <dialog id="my_modal_5" className="modal">
                        <div className="modal-box">
                            <form>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Input new department</legend>
                                    <input type="email" className="input" placeholder="Type here" onChange={(e)=>{setDept(e.target.value);}}/> 
                                </fieldset> 
                                <button className="btn btn-accent" onClick={()=>{changeDept()}}>Change</button>
                            </form>
                            <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_6')?.showModal()}>Batch</button>
                    <dialog id="my_modal_6" className="modal">
                        <div className="modal-box">
                            <form>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Input new batch</legend>
                                    <input type="email" className="input" placeholder="Type here" onChange={(e)=>{setBatch(e.target.value);}}/> 
                                </fieldset> 
                                <button className="btn btn-accent" onClick={()=>{changeBatch()}}>Change</button>
                            </form>
                            <p className="py-4 text-xs text-white/20">Press ESC key or click outside to cancel</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div>
                    <button className="btn p-1 text-sm bg-black/20 font-light" onClick={()=>document.getElementById('my_modal_7')?.showModal()}>Password</button>
                    <dialog id="my_modal_7" className="modal">
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