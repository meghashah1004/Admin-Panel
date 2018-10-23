exports.userUpdate='UPDATE party_user SET status=($1), subscription=($2), last_modified_at=($3), last_modified_by=($4) WHERE id=($5)';

exports.tripUpdate='UPDATE party_trips SET pickup_location=($2), drop_location=($3), pickup_date=($4), pickup_time=($5), car_type=($6), num_seats=($7), is_return_trip=($8), avg_distance=($9), avg_duration=($10), avg_fare=($11), fare_with_toll=($12), fare_without_toll=($13), promo_code=($14), booking_type=($15), status=($16),last_modified_at=($17), last_modified_by=($18),waypoints=($19),num_days=($20) where id=($1)';

exports.promoUpdate='UPDATE party_promo_category SET promo_code=($2), promo_percentage =($3), promo_category =($4), status=($5), last_modified_at=($6), last_modified_by=($7) WHERE id=($1)';

exports.commissionUpdate=" UPDATE  party_commission SET "+
"total_trip_amount=($1), "+
"percentage_commission=($2), "+
"amount_to_be_paid=($3), "+
"payment_status=($4), "+
"payment_mode=($5), "+
"account_information=($6), "+
"status=($7), "+
"last_modified_at=($8), "+
"last_modified_by=($9) "+
"where id=($10)";

exports.vehicleUpdate = 'UPDATE assigned_vehicle_details SET license_plate=($2),driver_name=($3), driver_contact_number=($4), owner_name=($5), owner_contact_number=($6), status=($7),last_modified_at=($8),last_modified_by=($9) where id=($1)';