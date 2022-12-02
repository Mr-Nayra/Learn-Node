--hotel
-- Database: `hotel_db`
--
-- --------------------------------------------------------
--
-- Table structure for table `bill_details`
--
CREATE TABLE `bill_details` (
    `Reservation_no` int DEFAULT NULL,
    `Customer_id` int DEFAULT NULL,
    `Amount` int DEFAULT NULL,
    `DAYS` int DEFAULT NULL,
    `Service_details` varchar(50) DEFAULT NULL
);

-- --------------------------------------------------------
--
-- Table structure for table `customer`
--
CREATE TABLE `customer` (
    `Customer_id` int NOT NULL,
    `Name` varchar(50) DEFAULT NULL,
    `Address` varchar(50) DEFAULT NULL,
    `Contact_No` varchar(50) DEFAULT NULL,
    `Age` varchar(50) DEFAULT NULL,
    `Zip_code` int DEFAULT NULL
);

-- --------------------------------------------------------
--
-- Table structure for table `payment`
--
CREATE TABLE `payment` (
    `Payment_id` int NOT NULL,
    `Transaction_id` int DEFAULT NULL,
    `Customer_id` int DEFAULT NULL,
    `Payment_Type` varchar(50) DEFAULT NULL,
    `Payment_Amount`int DEFAULT NULL
);

-- --------------------------------------------------------
--
-- Table structure for table `reservation`
--
CREATE TABLE `reservation` (
    `Reservation_no` int NOT NULL,
    `Customer_id` int NOT NULL,
    `Service_id` int NOT NULL,
    `room_id` int NOT NULL,
    `Check_in_date` date NOT NULL,
    `Check_out_date` date DEFAULT NULL,
    `Status` varchar(50) NOT NULL
);

-- --------------------------------------------------------
--
-- Table structure for table `services`
--
CREATE TABLE `services` (
    `Service_id` int NOT NULL,
    `Service_name` varchar(50) DEFAULT NULL,
    `Sevice_charge` int DEFAULT NULL
);



-- --------------------------------------------------------
--
-- Table structure for table `services`
--
CREATE TABLE `rooms` (
    `room_id` int NOT NULL,
    `room_number` varchar(50) DEFAULT NULL
);


INSERT INTO `rooms` VALUES (1,'201');
INSERT INTO `rooms` VALUES (2,'202');
INSERT INTO `rooms` VALUES (3,'203');
INSERT INTO `rooms` VALUES (4,'301');
INSERT INTO `rooms` VALUES (5,'302');
INSERT INTO `rooms` VALUES (6,'303');
INSERT INTO `rooms` VALUES (7,'401');
INSERT INTO `rooms` VALUES (8,'402');
INSERT INTO `rooms` VALUES (9,'403');
INSERT INTO `rooms` VALUES (10,'501');

--
-- Indexes for dumped tables
--
--
-- Indexes for table `bill_details`
--
ALTER TABLE
    `bill_details`
ADD
    PRIMARY KEY (`Reservation_no`),
ADD
    KEY `Customer_id` (`Customer_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE
    `customer`
ADD
    PRIMARY KEY (`Customer_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE
    `payment`
ADD
    PRIMARY KEY (`Payment_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE
    `reservation`
ADD
    PRIMARY KEY (`Reservation_no`);

--
-- Indexes for table `services`
--
ALTER TABLE
    `services`
ADD
    PRIMARY KEY (`Service_id`);

--
-- Constraints for dumped tables
--
--
-- Constraints for table `bill_details`
--
ALTER TABLE
    `bill_details`
ADD
    CONSTRAINT `bill_details_ibfk_1` FOREIGN KEY (`Reservation_no`) REFERENCES `reservation` (`Reservation_no`) ON DELETE CASCADE,
ADD
    CONSTRAINT `bill_details_ibfk_2` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`)  ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE
    `payment`
ADD
    CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`)  ON DELETE CASCADE;

--
-- Constraints for table `reservation`
--
ALTER TABLE
    `reservation`
ADD
    CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Customer_id`)  ON DELETE CASCADE;

--
-- Trigger
--

DELIMITER $$

CREATE TRIGGER create_bill
AFTER INSERT ON reservation
FOR EACH ROW
BEGIN
    IF NEW.Check_out_date IS NOT NULL THEN
        INSERT INTO bill_details VALUES (NEW.Reservation_no,NEW.Customer_id,NULL,DATEDIFF(NEW.Check_out_date,NEW.Check_in_date),NULL);
    END IF;

    UPDATE bill_details
    SET 
        bill_details.Amount = DATEDIFF(NEW.Check_out_date,NEW.Check_in_date) * (SELECT Sevice_charge FROM services WHERE services.Service_id = NEW.Service_id), 
        bill_details.Service_details =  (SELECT Service_name FROM services WHERE services.Service_id = NEW.Service_id);
END$$

DELIMITER ;

--
-- Function
--

DELIMITER $$
CREATE FUNCTION GetEmptyRooms (room int, stdate date, enddate date) RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    IF room IN(
        SELECT rooms.room_id
        FROM rooms, reservation
        WHERE reservation.room_id = rooms.room_id AND 
        (stdate <= Check_in_date AND Check_out_date >= enddate) OR (stdate < Check_in_date AND enddate > Check_in_date) OR (stdate < Check_out_date AND enddate > Check_out_date))
        THEN return false;
    ELSE
        return true;
    END IF;

END $$
DELIMITER ;

COMMIT;