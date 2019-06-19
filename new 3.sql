CREATE DEFINER=`root`@`localhost` PROCEDURE `trips_create_register`(IN startterminal varchar(50), IN arrivalterminal varchar(50), 
IN number_of_seats int, IN start_date date,
 IN companyid int, IN routeid int, 
 IN carid int, IN basefare int,
 IN payment_gateway varchar(50),IN payment_reference_number varchar(100),
 IN total_amount_paid int, IN payment_type varchar(50))
BEGIN
	
    declare generated_trip_number int;
    declare generated_book_number int;
    declare init_table int default 0;
	set @trip_number =  (select trip_number from pay_trips_booked where 
		(routeid = routeid and companyid = companyid) and travel_start_date = start_date LIMIT 1);
	
   
    if @trip_number is not null
	then
		set @trip_number = (select trip_number from pay_trips_booked where 
		routeid = routeid and companyid = companyid and travel_start_date = start_date LIMIT 1);
		set generated_trip_number = @trip_number;
   else
		set @trip_number = generate_random_number('pay_trips_booked', start_date);
        set generated_trip_number = @trip_number;
	end if;
		 set @book_number = generate_random_number('booked_trips_passenger_details', start_date);
		set generated_book_number = @book_number;
        
        
        set @isCarOcupied = isOccupied(number_of_seats, carid, routeid);
        -- declare inittable int;
        if not exists (select * from booked_car_details where datebooked = start_date LIMIT 1)
                then 
					-- @id = (select id from booked_car_details where carid = carid and routeid = routeid limit 1);
                    -- SET SQL_SAFE_UPDATES=0;
					-- update booked_car_details
					-- set trip_number = generated_trip_number, datebooked = start_date
					-- where id = @id;
					set @capacity = (select capacity from adm_cars_details where carid = carid limit 1);
					IF @capacity - number_of_seats >= 0
					THEN
						insert into pay_trips_booked(routeid, booknumber, trip_number,
						start_terminal,arrival_terminal, travel_start_date,
						companyid, base_fare, 
						number_of_tickets, total_amount_paid, isCompleted, payment_type)
						values (routeid, generated_book_number, generated_trip_number, startterminal, arrivalterminal,
						start_date, companyid, basefare, number_of_seats, total_amount_paid, 0,payment_type );
					
						set @returncode = register_payment_type(@book_number, payment_reference_number, 
										payment_type, payment_gateway);
						set @bookedcarid = (select carid from adm_cars_details where carid = carid limit 1);
						set @capacity = (select capacity from adm_cars_details where carid = carid limit 1);
						
						-- DEPLOY CAR SEATS
						
						
						-- DEPLOY CAR
						insert into booked_car_details(carid, trip_number, capacity, available_seats, datebooked, routeid)
						 values (@bookedcarid, generated_trip_number, @capacity, @capacity, start_date, routeid);
						 
						 set @id = (select id from booked_car_details where carid = carid and routeid = routeid and datebooked = start_date limit 1);
						 
						 set @returncode = deployCar(generated_trip_number, @id,@capacity);
						 
						 update booked_car_details
						set available_seats = @capacity - number_of_seats
						where id = @id;
						
						select generated_book_number as booknumber,
						generated_trip_number as tripnumber, @id as bookcarid;
					ELSE
						select -400 as booknumber;
					END IF;
					
		else
			set @isCarOcupied = isOccupied(number_of_seats, carid, routeid);
			if @isCarOcupied = 0
			then
				/*set @isCarNotDeployed = isCarBooked(carid, routeid);
				if @isCarNotDeployed = 1
				then
					
				end if;*/
					insert into pay_trips_booked(routeid, booknumber, trip_number,
					start_terminal,arrival_terminal, travel_start_date,
					companyid, base_fare, 
					number_of_tickets, total_amount_paid, isCompleted, payment_type)
					values (routeid, generated_book_number, generated_trip_number, startterminal, arrivalterminal,
					start_date, companyid, basefare, number_of_seats, total_amount_paid, 0,payment_type );
					
					select generated_trip_number;
					
					set @returncode = register_payment_type(@book_number, payment_reference_number, 
										payment_type, payment_gateway);
					set @id = (select id from booked_car_details where carid = carid and routeid = routeid and datebooked = start_date limit 1);
					set @available_seats = (select available_seats from booked_car_details where carid = carid and datebooked = start_date and routeid = routeid limit 1);
					update booked_car_details
					set available_seats = @available_seats - number_of_seats
					where id = @id;
					select generated_book_number as booknumber, 
					generated_trip_number as tripnumber, @id as bookcarid;
			else 
					select -400 as booknumber;
			end if;
		end if;
        
    
END