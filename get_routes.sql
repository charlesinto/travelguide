CREATE DEFINER=`root`@`localhost` PROCEDURE `get_Routes`(IN startterminalid int, IN arrivalterminalid int, 
IN start_date date )
BEGIN
	/*
		start_terminal is the selected start park
        arrival_terminal is the selected arrival park
        start_terminal_state is the origin state
        arrival_terminal_state is the arrival state
    */
    
	DECLARE START_TERMINAL varchar(100);
    DECLARE ARRIIVAL_TERMINAL varchar(100);
    DECLARE START_TERMINAL_STATE varchar(100);
    DECLARE ARRIVAL_TERMINAL_STATE varchar(100);
    
    SET @current_Date = curdate();
    SET @limit_Date = date_add(curdate(), INTERVAL 21 DAY);
	IF start_date between @current_Date and @limit_Date
    THEN
        select terminal into START_TERMINAL
		from geo_terminals where id = startterminalid;
		
		select terminal into ARRIIVAL_TERMINAL
		from geo_terminals where id = arrivalterminalid;
		
		select state into START_TERMINAL_STATE
		from geo_terminals
		where id = startterminalid;
			select state into ARRIVAL_TERMINAL_STATE
			from geo_terminals
			where id = arrivalterminalid;
			
			DROP TABLE IF EXISTS routes;
			
			CREATE table ROUTES
			AS
			select * from geo_trip_routes
			where startTerminal = START_TERMINAL
			and arrivalTerminal = ARRIIVAL_TERMINAL and isAvailable = 1 
			union
			select * from geo_trip_routes
			where (trip_start_state = START_TERMINAL_STATE
			and trip_end_state = ARRIVAL_TERMINAL_STATE)
			and 
			(startTerminal <> START_TERMINAL and 
			arrivalTerminal <> ARRIIVAL_TERMINAL) and isAvailable = 1;
			
			IF EXISTS (SELECT * FROM booked_car_details)
			THEN
                set @routeid = (select id from geo_trip_routes where startTerminal = START_TERMINAL
								and arrivalTerminal = ARRIIVAL_TERMINAL and isAvailable = 1);
                DROP TABLE IF EXISTS TRIP_ROUTE_CARS ;
                
				CREATE TABLE TRIP_ROUTE_CARS
				AS 
				SELECT c.capacity as available_seats, R.id as routeid FROM geo_trip_routes R
					INNER JOIN adm_cars_details C
					ON R.carid = c.carid
					WHERE R.id = @routeid and R.id NOT IN (
					
						SELECT routeid FROM booked_car_details WHERE datebooked = start_date
                        and routeid = @routeid
					)
					union
					select Ca.capacity as available_seats, Rou.id from geo_trip_routes Rou
					INNER JOIN adm_cars_details Ca
					ON Rou.carid = Ca.carid
					where (trip_start_state = START_TERMINAL_STATE
					and trip_end_state = ARRIVAL_TERMINAL_STATE)
					and 
					(startTerminal <> START_TERMINAL and 
					arrivalTerminal <> ARRIIVAL_TERMINAL) and isAvailable = 1;
					
				CREATE TABLE FILTERED_ROUTE_CARS
                AS
				SELECT routeid, available_seats FROM TRIP_ROUTE_CARS 
				UNION 
				SELECT routeid, available_seats FROM booked_car_details
                WHERE routeid = @routeid AND datebooked = start_date;
				
			ELSE
				DROP TABLE IF EXISTS FILTERED_ROUTE_CARS;
				
				CREATE TABLE FILTERED_ROUTE_CARS
				select R.id as routeid, C.capacity as available_seats from geo_trip_routes R
				INNER JOIN adm_cars_details C
				on R.carid = c.carid
				where R.startTerminal = START_TERMINAL
				and R.arrivalTerminal = ARRIIVAL_TERMINAL and R.isAvailable = 1 
				union
				select Ro.id as routeid, Ca.capacity as available_seats from geo_trip_routes Ro
				INNER JOIN adm_cars_details Ca
				on Ro.carid = Ca.carid
				where (Ro.trip_start_state = START_TERMINAL_STATE
				and Ro.trip_end_state = ARRIVAL_TERMINAL_STATE)
				and 
				(Ro.startTerminal <> START_TERMINAL and 
				Ro.arrivalTerminal <> ARRIIVAL_TERMINAL) and Ro.isAvailable = 1;
				
			END IF;
			
			IF EXISTS (SELECT * FROM trip_routes_update)
			then
			   SELECT r.id, r.startTerminal, r.arrivalTerminal,
				r.trip_start_state, r.trip_end_state, r.carid,
				r.companyid, r.isavailable, r.lastupdated,
				p.price_per_seat, com.companyname, com.companycode,
				com.companyurl, com.companyLogoUrl,com.companyHeadquater,
				m.carName, m.carType, m.capacity,cd.available_seats,m.ac, m.more_leg_space,
				m.carImageUrl, r.datecreated FROM ROUTES r
				 inner join adm_cars_details m
				 on m.carid =  r.carid
				 inner join FILTERED_ROUTE_CARS cd
				 on cd.routeid = r.id
				 inner join adm_company_details com
				 on r.companyid = com.companyid
				 inner join price_per_route p
				 on p.routeid = r.id
				 where m.active = 1 and r.id not in 
				 (select routeid from trip_routes_update t where t.date_not_available = start_date );
				 
			else
				SELECT r.id, r.startTerminal, r.arrivalTerminal,
				r.trip_start_state, r.trip_end_state, r.carid,
				r.companyid, r.isavailable, r.lastupdated,
				p.price_per_seat, com.companyname, com.companycode,
				com.companyurl, com.companyLogoUrl,com.companyHeadquater,
				m.carName, m.carType, m.capacity,cd.available_seats,m.ac, m.more_leg_space,
				m.carImageUrl, r.datecreated FROM ROUTES r
				 inner join adm_cars_details m
				 on m.carid =  r.carid
				 inner join FILTERED_ROUTE_CARS cd
				 on cd.routeid = r.id
				 inner join adm_company_details com
				 on r.companyid = com.companyid
				 inner join price_per_route p
				 on p.routeid = r.id
				 where m.active = 1;
			end if;
	 else
     
		SELECT 'no records found' as message;
    END IF;
		DROP TABLE IF EXISTS TRIP_ROUTE_CARS ;
		DROP TABLE IF EXISTS FILTERED_ROUTE_CARS;
END