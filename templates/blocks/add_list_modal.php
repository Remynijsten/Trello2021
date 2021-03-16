<div class="lists-modal modal">
    <div class="modal_overlay"></div>
    <div class="modal_body animate__animated animate__bounceInUp">
        <span class="modal_body_close">
            <i class="fas fa-times"></i>
        </span>
        <div class="modal_body_content">
            <input type="text" name="title" maxlength="10" placeholder='Title'>
            <div class="row">
                <div class="col-6">
                    <label for='privacy'>List Privacy</label>
                    <select name='privacy'>
                        <option value='public'>Public</option>
                        <option value='private'>Private</option>
                    </select>
                </div>              
                <div class="col-6">
                    <label for='privacy'>Color</label>
                    <select name='color'>
                        <option value='blue'></option>
                        <option value='yellow'></option>
                        <option value='orange'></option>
                        <option value='green'></option>
                        <option value='purple'></option>
                    </select>        
                    <ul class='color-list'>
                        <li><div class='colorpicker' data-value='blue' value=''></div></li>
                        <li><div class='colorpicker' data-value='yellow' value=''></div></li>
                        <li><div class='colorpicker' data-value='orange' value=''></div></li>
                        <li><div class='colorpicker' data-value='green' value=''></div></li>
                        <li><div class='colorpicker' data-value='purple' value=''></div></li>
                    </ul>           
                </div>        
            </div>
            <div class="addlist-button">Add List</div>
        </div>           
    </div>
</div>