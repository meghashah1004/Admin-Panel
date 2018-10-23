  exports.userQuery="SELECT u.id,u.name, u.email,u.phone_no,u.status,u.subscription,to_char(u.created_at, 'DD-MM-YYYY, HH12:MI:SS') as created_at  FROM party_user u ORDER BY u.id DESC";

exports.tripsQuery="SELECT t.id, u.name, u.phone_no, t.status, t.booking_type, t.pickup_location, t.waypoints, t.drop_location, to_char(t.pickup_date, 'YYYY-MM-DD') as pickup_date, t.pickup_time, t.car_type, t.num_seats, t.is_return_trip, t.avg_distance, t.avg_duration, t.avg_fare, t.fare_with_toll, t.fare_without_toll, t.promo_code, to_char(t.created_at, 'DD-MM-YYYY, HH12:MI:SS') as created_at, v.license_plate, v.driver_name, v.driver_contact_number, v.owner_name, v.owner_contact_number FROM party_trips t JOIN party_user u ON t.party_user_id = u.id LEFT JOIN assigned_vehicle_details v ON t.id=v.party_trip_id ORDER BY t.id DESC";

exports.promoQuery=" SELECT p.id,u.name,u.phone_no,p.promo_code,p.promo_percentage,p.promo_category,p.status, to_char(p.created_at, 'DD-MM-YYYY, HH12:MI:SS') as created_at  FROM party_user u JOIN party_promo_category p ON u.id = p.party_user_id ORDER BY p.id DESC";

exports.commissionQuery="SELECT c.id, u.name, u.phone_no,u.email,t.pickup_location, t.waypoints, t.drop_location,c.total_trip_amount,c.percentage_commission,c.amount_to_be_paid,c.payment_status,c.payment_mode,c.account_information,c.status, to_char(c.created_at, 'DD-MM-YYYY, HH12:MI:SS') as created_at" +" FROM party_commission c JOIN party_trips t ON c.party_trip_id = t.id JOIN party_user u ON c.party_user_id = u.id ORDER BY c.id DESC";

exports.vehicleQuery="select * from assigned_vehicle_details";