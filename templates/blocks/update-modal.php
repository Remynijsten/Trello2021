<div class="update-modal modal d-none">
    <div class="modal_overlay"></div>
    <div class="modal_body animate__animated animate__bounceInUp">
        <span class="modal_body_close">
            <i class="fas fa-times"></i>
        </span>
        <div class="modal_body_content">
            <h3>Update</h3>
            <input type="text" name="title" maxlength="10" placeholder='Title'>
            <textarea name="description" placeholder="Description"></textarea>
            <input type="number" name="duration">
            <select class="status">
                <option disabled selected>Select status</option>
                <option value="Not Started">Not Started</option>
                <option value="Busy">Busy</option>
                <option value="Done">Done</option>
            </select>
            <div class="row">
                <div class="col-4"><button class="cancel">Cancel</button></div>
                <div class="col-4"><button class="remove">Remove</button></div>
                <div class="col-4"><button class="update">Update</button></div>
            </div>
        </div>
    </div>
</div>