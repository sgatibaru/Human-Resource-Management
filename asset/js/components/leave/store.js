let HRM_Leave_Store = {
	state: {
		header: {},
		is_new_leave_type_form_visible: false,
		is_new_holiday_form_visible: false,
		is_new_leave_records_form_visible: false,
		is_leave_form_active: false,
		leave_records: [],
		leave_meta: {},
		current_emp_current_month_leaves: [],
		pending_leaves: [],
		departmentDropDown: [],
		holidays: [],
		leaveTypes: [],
		approvedLeaves: [],
		cancelLeaves: [],
		getIndex: function ( itemList, id, slug) {
            var index = false;

            itemList.forEach(function(item, key) {
                if (item[slug] == id) {
                    index = key;
                }
            });

            return index;
        },
	},

	mutations: {
		setCancelLeaves (state, calcelLeaves) {
			state.cancelLeaves = calcelLeaves;
		},
		setApprovalLeaves (state, approvedLeaves) {
			state.approvedLeaves = approvedLeaves;
		},
		header (state, header) {
			state.header = header.header;
		},
		isNewLeaveTypeFormVisible (state, is_visible) {
			state.is_new_leave_type_form_visible = is_visible.is_visible;
		},
		isNewLeaveRecordsFormVisible ( state, is_visible ) {
			state.is_new_leave_records_form_visible = is_visible.is_visible;
		},

		isNewHolidayFormVisible ( state, is_visible ) {
			state.is_new_holiday_form_visible = is_visible.is_visible;
		},

		showHideleaveForm  (state, status) {
			if ( status === 'toggle' ) {
                state.is_leave_form_active = state.is_leave_form_active ? false : true;
            } else {
                state.is_leave_form_active = status;
            }
		},

		getLeaveRecords (state, leave_records) {
			state.leave_records = leave_records.data;
			state.leave_meta = leave_records.meta;
		},

		setPendingLeaves (state, pending_leaves) {
			state.pending_leaves = pending_leaves;
		},

		afterDeleteLeave (state, id) {
			var index = state.getIndex(state.leave_records, id, 'id');
			state.leave_records.splice( index, 1 );
		},
		setDepartment (state, dropDown) {
			state.departmentDropDown = dropDown;
		},
		setHoliday (state, holidays) {
			state.holidays = holidays;
		},
		updateHolidays (state, holidays) {
			state.holidays.push(holidays);
		},
		afterUpdateHoliday (state, holiday) {
			var index = state.getIndex(state.holidays, holiday.id, 'id');
			state.holidays.splice( index, 1, holiday );
		},
		afterDeleteHoliday (state, id) {
			var index = state.getIndex(state.holidays, id, 'id');
			state.holidays.splice( index, 1 );
		},
		setLeaveTypes (state, leaveTypes) {
			state.leaveTypes = leaveTypes;
		},
		setNewLeaveType (state, leaveType) {
			state.leaveTypes.push(leaveType);
		},

		afterDeleteLeaveType (state, id) {
			var index = state.getIndex(state.leaveTypes, id, 'id');
			state.leaveTypes.splice( index, 1 );
		},
		afterUpdateStatus (state, data) {
			
			if ( data.section == 1 ) {
				let index = state.getIndex(state.pending_leaves, data.record.id, 'id');
				state.pending_leaves.splice(index, 1);
			
			} else if ( data.section == 2 ) {
				let index = state.getIndex(state.approvedLeaves, data.record.id, 'id');
				state.approvedLeaves.splice(index, 1);
			
			} else if ( data.section == 3 ) {
				let index = state.getIndex(state.cancelLeaves, data.record.id, 'id');
				state.cancelLeaves.splice(index, 1);
			}

			if ( data.record.status == 1 ) {
				state.pending_leaves.push(data.record);
			
			} else if ( data.record.status == 2 ) {
				state.approvedLeaves.push(data.record);
			
			} else if ( data.record.status == 3 ) {
				state.cancelLeaves.push(data.record);
			}


		},

		afterCreateNewLeave (state, leaves) {
			leaves.forEach(function(leave) {
				state.leave_records.push(leave.data);
			});

			console.log(leaves, state.leave_records);
		}
	}
};


export default HRM_Leave_Store;